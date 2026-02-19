#Will setup the data to then be loaded into the model to begin the training process
from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, TaskType, prepare_model_for_kbit_training
from transformers import TrainingArguments, Trainer
import torch
import os
from huggingface_hub import login
import gc

#Gets access to the the model data but now  we want to convert that
#json into a hugging face dataset that we can use to train
login(token=os.getenv("HF_TOKEN"), add_to_git_credential=True)
modelData = load_dataset("json", data_files="/content/drive/MyDrive/trainingdata.json")

#Making sure that memory cache can be cleared through the runs
torch.cuda.empty_cache()
gc.collect()

#Now lets load our model up with its tokens
modelPath = "meta-llama/Meta-Llama-3-8B-Instruct"

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",      
    bnb_4bit_use_double_quant=True,   #Optimizing the model more to handle the 8gb capacity
    bnb_4bit_compute_dtype=torch.float16
)

#Same setup of loading the token with the tokenizer as settting up the model
#except we are having it save to the memeory
llamaModel = AutoModelForCausalLM.from_pretrained(
    modelPath,
    quantization_config=bnb_config,
    device_map="auto",
    low_cpu_mem_usage=True,
    torch_dtype=torch.float16
)

modelTokenizer = AutoTokenizer.from_pretrained(modelPath)
modelTokenizer.pad_token = modelTokenizer.eos_token

#Allow for the model to begin its training
llamaModel = prepare_model_for_kbit_training(llamaModel)

#Converting the tokenizer setup to fit the format of the json file
def preprocess_function(examples):
    prompts = []

    for i in range(len(examples["Instruction"])):
        instr = examples["Instruction"][i]
        inp = examples["Input"][i]
        out = examples["Output"][i]
        #Breaks down each of the formats to then parse through
        text = f"Instruction: {instr}\nInput: {inp}\nOutput: {out}"

        #Adding to the array
        prompts.append(text)

    tokenized = modelTokenizer(prompts, truncation=True, padding="max_length", max_length=512)

    #Should copy those labels properly
    tokenized["labels"] = tokenized["input_ids"].copy()

    return tokenized

tokenized_ds = modelData["train"].map(preprocess_function, batched=True)

#Setting up the LoRA configuration, will help the model train
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type= TaskType.CAUSAL_LM
)

#Now we can apply that specific configuration to the model so that only the LoRA updates are done
#under the training aspect
adaptiveModel = get_peft_model(llamaModel, lora_config)

#The actually training for the model to go through
training_args = TrainingArguments(
    output_dir="./lora-output",
    per_device_train_batch_size=1,
    gradient_accumulation_steps=4,
    warmup_steps=2,
    max_steps=100,
    learning_rate=2e-4, #The rate at which the model will be adaptive to grow
    fp16=True,
    logging_steps=10,
    optim="paged_adamw_8bit" #Built for the optimization hopefully
)

trainer = Trainer(
    model=adaptiveModel,
    args=training_args,
    train_dataset=tokenized_ds,
)

trainer.train() #Begin the training aspect

#Then at the end save the updated training of the model
trainer.save_model("./final-vt-navigation-lora")