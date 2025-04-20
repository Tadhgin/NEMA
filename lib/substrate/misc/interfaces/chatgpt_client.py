import openai
from app.config import OPENAI_API_KEY

class ChatGPTClient:
    def __init__(self):
        if not OPENAI_API_KEY:
            raise ValueError("OpenAI API key is not set. Please check your configuration.")
        openai.api_key = OPENAI_API_KEY

    def send_message(self, prompt):
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an AI assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        return response['choices'][0]['message']['content']