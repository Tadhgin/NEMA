
# Echo Core Execution Loop
from brain.state_manager import get_current_state

def run():
    state = get_current_state()
    print("Booted echo with state:", state)
