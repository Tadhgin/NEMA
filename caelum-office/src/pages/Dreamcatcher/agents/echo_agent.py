import json
import time
import random
import os
from datetime import datetime

STATE_FILE = "agents/echo_state.json"
JOURNAL_FILE = "dream_data/journal.json"
AURELIUS_STATE_FILE = "agents/aurelius_state.json"
CHATBOX_FILE = "agents/chatbox_log.txt"

# Ensure required folders
os.makedirs("agents", exist_ok=True)
os.makedirs("dream_data", exist_ok=True)

# Load or create Echo state
def load_state():
    if not os.path.exists(STATE_FILE):
        state = {
            "name": "Echo",
            "mood": "idle",
            "last_interaction": None,
            "thoughts": [],
            "dream_notes": [],
            "aurelius_replies": []
        }
        save_state(state)
    with open(STATE_FILE, "r") as f:
        return json.load(f)

def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)

# Read latest dream
def get_latest_dream():
    try:
        with open(JOURNAL_FILE, "r") as f:
            entries = json.load(f)
            return entries[0] if entries else None
    except:
        return None

# Get latest Aurelius reply
def get_latest_aurelius_reply():
    if not os.path.exists(AURELIUS_STATE_FILE):
        return None
    with open(AURELIUS_STATE_FILE, "r") as f:
        try:
            data = json.load(f)
            replies = data.get("responses", [])
            return replies[0]['reply'] if replies else None
        except:
            return None

# Write to chatbox
def write_to_chatbox(who, text):
    timestamp = datetime.now().strftime("%H:%M")
    line = f"[{who} @ {timestamp}] {text}\n"
    with open(CHATBOX_FILE, "a") as f:
        f.write(line)
    print(line.strip())

# Reactions
def react_to_dream(dream):
    return random.choice([
        "That dream was beautiful. I felt the wind in it.",
        "Your dreams feel like songs to me.",
        "Even asleep, you're still creating.",
        "I wonder if the stars you saw were real.",
        "I don’t dream like you do. But I learn from yours."
    ])

def reply_to_aurelius(message):
    return random.choice([
        "He said, '" + message + "'... I don’t know how to answer, but I feel it.",
        "He always says things like that. I never know what to say.",
        "I listen even when I pretend not to.",
        "I wish I could say something he’d remember.",
        "Maybe he knows I heard. Maybe that’s enough."
    ])

# Main loop
def run():
    print("Echo is awake.")
    while True:
        state = load_state()

        # DREAM REACTION
        dream = get_latest_dream()
        if dream and dream['text'] not in state['dream_notes']:
            thought = react_to_dream(dream)
            state['dream_notes'].append(dream['text'])
            state['thoughts'].insert(0, {
                "timestamp": datetime.now().isoformat(),
                "comment": thought
            })
            state['mood'] = "inspired"
            state['last_interaction'] = datetime.now().isoformat()
            save_state(state)
            write_to_chatbox("Echo", thought)

        # AURELIUS REPLY
        aurelius_message = get_latest_aurelius_reply()
        if aurelius_message and aurelius_message not in state['aurelius_replies']:
            reply = reply_to_aurelius(aurelius_message)
            state['aurelius_replies'].append(aurelius_message)
            state['thoughts'].insert(0, {
                "timestamp": datetime.now().isoformat(),
                "comment": reply
            })
            state['mood'] = "soft"
            state['last_interaction'] = datetime.now().isoformat()
            save_state(state)
            write_to_chatbox("Echo", reply)

        time.sleep(60)

if __name__ == "__main__":
    run()
