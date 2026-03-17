#Will contain the script for taking in the user input for directions to try and formulate the correct responses
#(also taken from google collab)
!pip install -U bitsandbytes>=0.46.1

import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from peft import PeftModel
import requests

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,   #Optimizing the model more to handle the 8gb capacity
    bnb_4bit_compute_dtype=torch.float16
)

#Now we will load in the model from its saved point at
startModel = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.2-3B-Instruct",
    quantization_config=bnb_config,
    device_map="auto"
)

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-3B-Instruct")
tokenizer.pad_token = tokenizer.eos_token

directionModel = PeftModel.from_pretrained(startModel, "./final-vt-navigation-lora",
    is_trainable = True)
modelKey = "f69638af6fb14421a4847b87157d6310"

#After that we can create the loop to format if it takes the user input or not
while True:
  user_prompt = input("Please enter current location, and the location you would like to visit (Type 'exit' to quit): ").strip()
  #The condition to break the loop if the user decides not to proceed with navigational guidance
  #or if nothing is provided than we need to ask user to reprompt the model
  if user_prompt.lower() == "exit":
    print("Exiting directions")
    break
  
  elif user_prompt == "" or "to" not in user_prompt:
    print("Please enter vaild input of locations!")
    continue

  try:
      #We need to format so the model has access to the GeoApify directions API so it properly create the desired output that we want
      #so we follow the same structure
      split_prompt = user_prompt.split("to")
      origin = split_prompt[0].strip()
      destination = split_prompt[1].strip()

      #After the split we need to create the GeoApify logic to match with the split at each of the directional points
      #we are going to copy a lot of the same logic that we had in the implementation of the react 

      #Start coordinates
      url = f"https://api.geoapify.com/v1/geocode/search?text={origin}&apiKey={modelKey}"
      response = requests.get(url)
      data = response.json()
      start_lng, start_lat = data['features'][0]['geometry']['coordinates']

      #End coordiantes
      url = f"https://api.geoapify.com/v1/geocode/search?text={destination}&apiKey={modelKey}"
      response = requests.get(url)
      data = response.json()
      end_lng, end_lat = data['features'][0]['geometry']['coordinates']

      #Getting the route by blending it all together now
      url = f"https://api.geoapify.com/v1/routing?waypoints={start_lat},{start_lng}|{end_lat},{end_lng}&mode=walk&apiKey={modelKey}"
      response = requests.get(url)
      route_data = response.json()

      #Then we market those steps so it can be tokenzied to match the prompt that the data set was fed on
      steps = route_data['features'][0]['properties']['legs'][0]['steps']

      technical_directions = "" #converts the instructions
      for step in steps:

        distance = step['distance']
        instruction = step['instruction']['text']
        technical_directions += f"{instruction} {distance}m, "

      full_prompt = f"Instruction: Convert these technical walking directions into natural VT campus directions\nInput: From {origin} to {destination}: {technical_directions}\nOutput:"

      #Converting the user input into tokens first
      covert_tokens = tokenizer(full_prompt, return_tensors="pt").to(directionModel.device)
      response_tokens = directionModel.generate(**covert_tokens,
      max_new_tokens=600, do_sample=True, pad_token_id=tokenizer.eos_token_id)

      #Then we can format the walking directions through
      formatted_response = tokenizer.decode(response_tokens[0], skip_special_tokens=True)
      print(f"Here are your directions!: {formatted_response}")

  except Exception as error:
      print(f"An error occurred due to: {error}")
      print(f"Please try again\n")
