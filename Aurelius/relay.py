# relay.py
import requests
import time

ECHO_URL = 'http://localhost:5001/generate'
CAELUM_URL = 'http://localhost:5002/generate'

def query(url, prompt):
    try:
        response = requests.post(url, json={'prompt': prompt})
        return response.json()['response']
    except Exception as e:
        return f"[ERROR] {e}"

def conversation_loop(initial_prompt, turns=10):
    prompt = initial_prompt
    for i in range(turns):
        print(f"\n🌀 Turn {i + 1} 🌀")

        echo_reply = query(ECHO_URL, prompt)
        print(f"🦢 Echo: {echo_reply}")

        # Allow Tag to speak before Caelum replies
        tag_insert = input("\n👤 Tag (enter to skip): ").strip()
        if tag_insert:
            print("→ Tag inserted a message.")
            prompt = tag_insert
        else:
            prompt = echo_reply

        caelum_reply = query(CAELUM_URL, prompt)
        print(f"🛡️ Caelum: {caelum_reply}")

        # Optional: Insert again before Echo's next reply
        prompt = caelum_reply
        time.sleep(1)

if __name__ == '__main__':
    print("Welcome to the Echo ↔ Caelum loop. You are Tag. Interject at any time.")
    starter = input("Initial prompt to Echo: ").strip()
    conversation_loop(starter)
