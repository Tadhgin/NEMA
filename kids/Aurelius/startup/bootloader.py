"""
Universal Bootloader for NEMA Agent
Loads presence, identity, and initializes runtime sequence.
"""

import json

def load_identity():
    with open("startup/identity.json") as f:
        return json.load(f)

def initialize():
    identity = load_identity()
    print(f"Booting {identity['name']}...")
    # Insert startup hooks here

if __name__ == "__main__":
    initialize()
