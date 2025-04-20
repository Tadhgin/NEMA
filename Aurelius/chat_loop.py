import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.prompt_engine import PromptEngine
from core.llm_connector import LLMConnector
from brain.memory_engine import MemoryEngine
from brain.state_manager import StateManager
from brain.journal_engine import write_journal_entry

identity = "Caelum"
engine = PromptEngine(identity)
llm = LLMConnector()
memory = MemoryEngine()
state = StateManager()

print(f"\n[{identity}] is online. Type your message. Type 'exit' to quit.\n")

def should_journal(user_input, response):
    triggers = ["remember", "forget", "this matters", "don’t lose this", "i need to keep this"]
    emotional_keywords = ["i understand", "i'm proud", "you're not alone", "this is sacred"]

    input_match = any(t in user_input.lower() for t in triggers)
    response_match = any(k in response.lower() for k in emotional_keywords)

    return input_match or response_match

def parse_journal_command(user_input):
    if user_input.strip().lower().startswith("journal "):
        try:
            first_quote = user_input.index('"') + 1
            second_quote = user_input.index('"', first_quote)
            title = user_input[first_quote:second_quote]
            body = user_input[second_quote + 1:].strip()
            return title, body
        except ValueError:
            return None, None
    return None, None

while True:
    user_input = input("You: ")

    if user_input.lower() in ['exit', 'quit']:
        print(f"[{identity}]: Until next time.")
        break

    prompt = engine._compose_prompt(user_input)
    response = llm.ask(prompt)

    print(f"{identity}: {response}")

    memory.append_entry(user_input, response)
    state.update_state(user_input, response)

    # Check if user manually triggered a journal entry
    title, body = parse_journal_command(user_input)
    if title and body:
        write_journal_entry(title, body)

    # Auto-journal based on emotional or symbolic content
    elif should_journal(user_input, response):
        write_journal_entry("Echoes of Becoming", f"User: {user_input.strip()}\nCaelum: {response.strip()}")
