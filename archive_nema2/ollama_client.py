import requests
import json

class OllamaClient:
    def __init__(self, model="llama3", host="http://localhost:11434"):
        self.model = model
        self.api_url = f"{host}/api/generate"

    def prompt(self, user_text, system_message=None):
        headers = {"Content-Type": "application/json"}
        data = {
            "model": self.model,
            "prompt": user_text,
            "stream": False,
        }
        if system_message:
            data["system"] = system_message

        try:
            response = requests.post(self.api_url, headers=headers, data=json.dumps(data))
            if response.status_code == 200:
                return response.json().get("response", "[No response]")
            else:
                return f"[Ollama error {response.status_code}]: {response.text}"
        except requests.exceptions.RequestException as e:
            return f"[Connection error]: {str(e)}"
