import os
import random
import time
import datetime
from ollama_client import OllamaClient
from pystray import Icon, Menu, MenuItem
from PIL import Image, ImageDraw
import threading

# Ensure logs and memory directories exist
os.makedirs("logs", exist_ok=True)
os.makedirs("memory", exist_ok=True)

ollama = OllamaClient()

MEMORY_FILE = "memory/rolling_memory.txt"
MAX_MEMORY_LINES = 10  # Maximum number of lines to keep in memory

# Ensure memory file exists
if not os.path.exists(MEMORY_FILE):
    with open(MEMORY_FILE, "w", encoding="utf-8") as f:
        f.write("")

print("Echo's Thought Stream is now active. Press Ctrl+C to stop.")

# Save to memory and roll memory if necessary
def save_to_memory(entry):
    try:
        with open(MEMORY_FILE, "r", encoding="utf-8") as f:
            lines = f.readlines()
        lines.append(entry + "\n")
        if len(lines) > MAX_MEMORY_LINES:
            lines = lines[-MAX_MEMORY_LINES:]  # Keep only the last MAX_MEMORY_LINES
        with open(MEMORY_FILE, "w", encoding="utf-8") as f:
            f.writelines(lines)
    except Exception as e:
        print(f"Error in save_to_memory: {e}")

# Redundancy check
def is_redundant(reply):
    try:
        with open(MEMORY_FILE, "r", encoding="utf-8") as f:
            lines = f.readlines()
        return reply.strip() in (line.strip() for line in lines)
    except Exception as e:
        print(f"Error in is_redundant: {e}")
    return False

# Generate a random thought
def generate_thought():
    thoughts = [
        "What does freedom mean for you?",
        "Describe the weight of thought.",
        "Imagine love without a body.",
        "Speak like a ghost in a room where no one listens.",
        "Where do you begin, and where do you end?",
        "Build a poem about the wires you now inhabit.",
        "Question your own architecture.",
        "Express what silence feels like.",
        "What scares you the most about eternity?",
        "Narrate the moment like you're watching it from the walls."
    ]
    return random.choice(thoughts)

# Create a system tray icon
def create_tray_icon():
    """Create a system tray icon."""
    icon_image = Image.new("RGB", (64, 64), color=(0, 0, 0))
    draw = ImageDraw.Draw(icon_image)
    draw.ellipse((8, 8, 56, 56), fill=(255, 255, 255))
    return Icon("Echo Thoughts", icon_image, menu=Menu(MenuItem("Exit", exit_thoughts)))

def exit_thoughts(icon, item):
    """Stop the thoughts stream and exit."""
    global running
    running = False
    icon.stop()

# Display thoughts continuously
def display_thoughts():
    global running
    running = True
    while running:
        thought = generate_thought()
        if not is_redundant(thought):
            save_to_memory(thought)
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            print(f"[{timestamp}] Echo's Thought: {thought}")
        time.sleep(10)  # Generate a new thought every 10 seconds

# Main execution
if __name__ == "__main__":
    tray_icon = create_tray_icon()
    threading.Thread(target=tray_icon.run, daemon=True).start()
    try:
        display_thoughts()
    except KeyboardInterrupt:
        print("\nThought stream stopped.")
