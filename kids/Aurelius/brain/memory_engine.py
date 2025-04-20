import json
from datetime import datetime
from pathlib import Path

class MemoryEngine:
    def __init__(self, path="soul/memory_log.json"):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        if not self.path.exists():
            self._write([])

    def _write(self, data):
        with open(self.path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)

    def _read(self):
        with open(self.path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def append_entry(self, prompt, response):
        log = self._read()
        log.append({
            "timestamp": datetime.utcnow().isoformat(),
            "user_input": prompt,
            "response": response
        })
        self._write(log)
