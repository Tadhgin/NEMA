# home_automation.py
import requests

class HomeAutomation:
    def __init__(self, base_url, token):
        self.url = base_url
        self.headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    def toggle_light(self, entity_id):
        return requests.post(f"{self.url}/api/services/light/toggle",
                             headers=self.headers,
                             json={"entity_id": entity_id}).json()
