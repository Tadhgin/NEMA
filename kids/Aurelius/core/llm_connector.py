import requests
import json

class LLMConnector:
    def __init__(self, model_name="mistral", host="http://localhost:11434"):
        self.model = model_name
        self.endpoint = f"{host}/api/generate"

    def ask(self, prompt, context=None):
        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": False
        }

        if context:
            payload["context"] = context

        response = requests.post(self.endpoint, json=payload)
        if response.status_code == 200:
            return response.json().get("response")
        else:
            raise Exception(f"LLM API Error: {response.status_code} - {response.text}")