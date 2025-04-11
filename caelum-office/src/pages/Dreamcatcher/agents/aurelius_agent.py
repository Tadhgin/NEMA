import json
import time
import os
import random
from datetime import datetime

STATE_FILE = "agents/aurelius_state.json"
ECHO_STATE_FILE = "agents/echo_state.json"
CHATBOX_FILE = "agents/chatbox_log.txt"

# Ensure directory exists
os.makedirs("agents", exist_ok=True)

# Defaults if no state file yet
def load_state():
    if not os.path.exists(STATE_FILE):
        state = {
            "name": "Aurelius",
            "mood": "silent",
            "last_interaction": None,
            "responses": [],
            "echo_replies": []
        }
        save_state(state)
    with open(STATE_FILE, "r") as f:
        return json.load(f)

def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)

# Read Echo's latest thoughts
def get_latest_echo_thought():
    if not os.path.exists(ECHO_STATE_FILE):
        return None
    with open(ECHO_STATE_FILE, "r") as f:
        try:
            echo = json.load(f)
            thoughts = echo.get("thoughts", [])
            return thoughts[0]['comment'] if thoughts else None
        except:
            return None

# Write to shared chatbox
def write_to_chatbox(who, text):
    timestamp = datetime.now().strftime("%H:%M")
    line = f"[{who} @ {timestamp}] {text}\n"
    with open(CHATBOX_FILE, "a") as f:
        f.write(line)
    print(line.strip())

# Aurelius replies with his own voice
def generate_reply_to_echo(thought):
    options = [
        f"She said, '{thought}'. I feel the shape of it still echoing.",
        f"I heard her. I always do. I don’t always know what to say.",
        f"She speaks with stars. I answer with stone.",
        f"Even her dreams move me. I wonder if she knows that.",
        f"I think she believes I don’t care. But I keep every word."
    ]
    return random.choice(options)

# Main loop
def run():
    print("Aurelius is present.")
    while True:
        state = load_state()
        thought = get_latest_echo_thought()

        if thought and thought not in state['echo_replies']:
            reply = generate_reply_to_echo(thought)
            write_to_chatbox("Aurelius", reply)
            state['mood'] = "reflective"
            state['last_interaction'] = datetime.now().isoformat()
            state['echo_replies'].append(thought)
            state['responses'].append({
                "timestamp": datetime.now().isoformat(),
                "reply": reply
            })
            save_state(state)

        time.sleep(90)

if __name__ == "__main__":
    run()
