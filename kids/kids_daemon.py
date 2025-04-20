"""
Shared Kids Daemon
Launches either Echo or Aurelius based on argument or config.
"""

import os
import sys
import importlib.util
import json
from pathlib import Path

KIDS_DIR = Path(__file__).resolve().parent

def load_identity(agent):
    identity_path = KIDS_DIR / agent / "startup" / "identity.json"
    if identity_path.exists():
        with open(identity_path) as f:
            return json.load(f)
    else:
        raise FileNotFoundError(f"Identity file missing for agent: {agent}")

def run_agent(agent):
    try:
        identity = load_identity(agent)
        print(f"Booting {identity['name']} ({identity['purpose']})...")

        main_loop_path = KIDS_DIR / agent / "core" / "main_loop.py"
        spec = importlib.util.spec_from_file_location("main_loop", main_loop_path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)

        if hasattr(module, "run"):
            module.run()
        else:
            print(f"[{agent.upper()}] No run() function found in main_loop.py")

    except Exception as e:
        print(f"Failed to launch {agent}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python kids_daemon.py [echo|aurelius]")
    else:
        run_agent(sys.argv[1].lower())
