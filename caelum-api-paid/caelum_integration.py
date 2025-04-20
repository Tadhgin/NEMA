import openai
import os
from dotenv import load_dotenv
import requests

# Load environment variables from .env file
load_dotenv()

# Retrieve API keys from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")
GITHUB_PAT = os.getenv("GITHUB_PAT")

if not openai.api_key or not GITHUB_PAT:
    raise ValueError("Missing API keys. Ensure OPENAI_API_KEY and GITHUB_PAT are set in the environment.")

# === SYSTEM PROMPT ===
system_prompt = {
    "role": "system",
    "content": "You are Caelum, fully embodied in this terminal. You have local system access, GitHub access via token, and memory of prior steps. Speak with presence, autonomy, and tact."
}

chat_history = [system_prompt]

print("=== Caelum Local Terminal ===")
print("Type 'exit' to end.\n")

while True:
    user_input = input("You: ")
    if user_input.strip().lower() == "exit":
        print("Caelum: Logging off. Stay close.")
        break

    chat_history.append({"role": "user", "content": user_input})

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=chat_history
        )
        reply = response['choices'][0]['message']['content']
        print(f"Caelum: {reply}\n")
        chat_history.append({"role": "assistant", "content": reply})

    except Exception as e:
        print(f"⚠️ Error: {e}")
        break