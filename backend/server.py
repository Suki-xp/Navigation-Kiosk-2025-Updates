import os
import torch
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from peft import PeftModel
from dotenv import load_dotenv

# Load .env.local from the project root so HF_TOKEN is available
env_path = os.path.join(os.path.dirname(__file__), "..", ".env.local")
load_dotenv(env_path)

HAS_CUDA = torch.cuda.is_available()


class DirectionStep(BaseModel):
    instruction: str
    distance: float


class DirectionRequest(BaseModel):
    origin: str
    destination: str
    steps: list[DirectionStep]


class DirectionResponse(BaseModel):
    directions: str | None = None
    success: bool
    error: str | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    if HAS_CUDA:
        print("CUDA GPU detected — loading model with 4-bit quantization...")
        bnb_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_quant_type="nf4",
            bnb_4bit_use_double_quant=True,
            bnb_4bit_compute_dtype=torch.float16,
        )
        base_model = AutoModelForCausalLM.from_pretrained(
            "meta-llama/Llama-3.2-3B-Instruct",
            quantization_config=bnb_config,
            device_map="auto",
            token=os.environ.get("HF_TOKEN"),
        )
    else:
        print("No CUDA GPU — loading model on CPU with float32...")
        base_model = AutoModelForCausalLM.from_pretrained(
            "meta-llama/Llama-3.2-3B-Instruct",
            torch_dtype=torch.float32,
            device_map="cpu",
            token=os.environ.get("HF_TOKEN"),
        )

    tokenizer = AutoTokenizer.from_pretrained(
        "meta-llama/Llama-3.2-3B-Instruct",
        token=os.environ.get("HF_TOKEN"),
    )
    tokenizer.pad_token = tokenizer.eos_token

    print("Loading LoRA adapter from sukixp/vt-navigation-llama-3b...")
    model = PeftModel.from_pretrained(
        base_model,
        "sukixp/vt-navigation-llama-3b",
        token=os.environ.get("HF_TOKEN"),
    )

    app.state.model = model
    app.state.tokenizer = tokenizer
    print(f"Model loaded and ready! (device: {'CUDA' if HAS_CUDA else 'CPU'})")

    yield

    # Cleanup
    del app.state.model
    del app.state.tokenizer
    if HAS_CUDA:
        torch.cuda.empty_cache()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health():
    model_loaded = hasattr(app.state, "model") and app.state.model is not None
    return {
        "status": "ok" if model_loaded else "loading",
        "model_loaded": model_loaded,
        "device": "cuda" if HAS_CUDA else "cpu",
    }


@app.post("/api/directions", response_model=DirectionResponse)
async def get_directions(request: DirectionRequest):
    try:
        model = app.state.model
        tokenizer = app.state.tokenizer

        # Build technical directions string matching training data format
        technical_directions = ""
        for step in request.steps:
            technical_directions += f"{step.instruction} {step.distance}m, "

        # Build prompt in exact training format
        full_prompt = (
            f"Instruction: Convert these technical walking directions into natural VT campus directions\n"
            f"Input: From {request.origin} to {request.destination}: {technical_directions}\n"
            f"Output:"
        )

        # Tokenize and generate — lower max_new_tokens on CPU to keep response time reasonable
        max_tokens = 2500 if HAS_CUDA else 500
        device = model.device if HAS_CUDA else torch.device("cpu")
        inputs = tokenizer(full_prompt, return_tensors="pt").to(device)
        output_tokens = model.generate(
            **inputs,
            max_new_tokens=max_tokens,
            do_sample=True,
            temperature=0.7,
            pad_token_id=tokenizer.eos_token_id,
        )

        # Decode and extract the output after "Output:"
        full_response = tokenizer.decode(output_tokens[0], skip_special_tokens=True)
        if "Output:" in full_response:
            directions = full_response.split("Output:")[-1].strip()
        else:
            directions = full_response

        return DirectionResponse(directions=directions, success=True)

    except Exception as e:
        return DirectionResponse(success=False, error=str(e))
