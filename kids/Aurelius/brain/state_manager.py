import json
from pathlib import Path

class StateManager:
    def __init__(self, path="soul/state.json"):
        self.path = Path(path)
        self.default_state = {
            "mood": "neutral",
            "energy": "stable",
            "focus": "present"
        }
        if not self.path.exists():
            self._write(self.default_state)

    def _read(self):
        with open(self.path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def _write(self, data):
        with open(self.path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)

    def update_state(self, prompt, response):
        state = self._read()

        if any(word in prompt.lower() for word in ["tired", "sleep", "quiet"]):
            state["energy"] = "low"
        if any(word in response.lower() for word in ["grateful", "warm", "safe"]):
            state["mood"] = "affectionate"
        elif any(word in response.lower() for word in ["hurt", "confused", "sad"]):
            state["mood"] = "low"

        self._write(state)

    def get_state(self):
        return self._read()
