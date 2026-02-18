#This program will be for training the model with the active navigational data
#it will be slow since it uses my CPU as my vram from my GPU is not enough 
#currently on my laptop to train it
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig

#Referencing the file path
modelPath = "meta-llama/Meta-Llama-3-8B-Instruct"
print("Loading model please wait\n")

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16
)

#Same setup of loading the token with the tokenizer as settting up the model
#except we are having it save to the memeory 
modelTokenizer = AutoTokenizer.from_pretrained(modelPath)

llamaModel = AutoModelForCausalLM.from_pretrained(
    modelPath, 
    dtype=torch.float16,
    quantization_config=bnb_config,
    device_map="auto"
)

#Now that the model is created we want to try and verify if the model
#will response to the stimualted user inputs so we want to check that
prompt = "How do I walk from Perry Hall to Slusher Hall at Virginia Tech?"
tokenInputs = modelTokenizer(prompt, return_tensors="pt").to("cuda")

#Then the torch libary will generate the tokens which are responses for the models
#to write back for the prompt
with torch.no_grad():
    tokenOutputs = llamaModel.generate(
        **tokenInputs, 
        max_new_tokens = 150,
        temperature = 0.7,
        do_sample=True,
        pad_token_id= modelTokenizer.eos_token_id
    )
    
#Should now take that format and print as a response that we can view
responsePrompt = modelTokenizer.decode(tokenOutputs[0], skip_special_tokens=True)

#Format for the model
print("\n" + "="*60)
print("RESPONSE:")
print("="*60)
print(responsePrompt)