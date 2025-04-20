memory = []

def store_memory(entry):
    """Store a memory entry."""
    memory.append(entry)
    if len(memory) > 100:  # Limit memory to the last 100 entries
        memory.pop(0)

def retrieve_memory():
    """Retrieve the entire memory."""
    return memory
