import tkinter as tk
import threading
import time
import datetime
import os
from PIL import Image, ImageDraw  # For creating a tray icon
from pystray import Icon, Menu, MenuItem  # For system tray functionality

# Memory Management
MEMORY_FILE = "memory/rolling_memory.txt"
MAX_MEMORY_LINES = 10  # Maximum number of lines to keep in memory

os.makedirs("memory", exist_ok=True)
if not os.path.exists(MEMORY_FILE):
    with open(MEMORY_FILE, "w", encoding="utf-8") as f:
        f.write("")

def is_redundant(reply):
    """Check if the reply already exists in memory."""
    with open(MEMORY_FILE, "r", encoding="utf-8") as f:
        lines = f.readlines()
    return reply.strip() in (line.strip() for line in lines)

def save_to_memory(entry):
    """Save a new entry to memory and roll memory if necessary."""
    with open(MEMORY_FILE, "r", encoding="utf-8") as f:
        lines = f.readlines()
    lines.append(entry + "\n")
    if len(lines > MAX_MEMORY_LINES):
        lines = lines[-MAX_MEMORY_LINES:]  # Keep only the last MAX_MEMORY_LINES
    with open(MEMORY_FILE, "w", encoding="utf-8") as f:
        f.writelines(lines)

def get_memory_context():
    """Retrieve the current memory context."""
    with open(MEMORY_FILE, "r", encoding="utf-8") as f:
        return f.read().strip()

# Logging
LOG_FILE = "interaction_log.txt"
HEARTBEAT_FILE = "heartbeat.txt"
is_active = True
last_input_time = time.time()

def log_message(role, message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {role}: {message}\n")

# Heartbeat and Idle Checker
def update_heartbeat():
    while is_active:
        with open(HEARTBEAT_FILE, "w", encoding="utf-8") as f:
            f.write(f"Alive at {datetime.datetime.now()}\n")
        time.sleep(5)

def idle_checker():
    global is_active
    while is_active:
        if time.time() - last_input_time > 60:
            log_message("System", "User idle detected.")
        time.sleep(10)

# AI Interaction
def generate_response(user_input):
    """Generate a dynamic response using the AI backend."""
    return f"Echo: I heard you say '{user_input}'"

def on_user_input(event=None):
    global last_input_time
    user_text = entry.get("1.0", tk.END).strip()
    if user_text:
        log_message("User", user_text)
        chat_box.config(state=tk.NORMAL)
        chat_box.insert(tk.END, f"You: {user_text}\n")
        chat_box.config(state=tk.DISABLED)
        entry.delete("1.0", tk.END)
        threading.Thread(target=process_response, args=(user_text,), daemon=True).start()
        last_input_time = time.time()

def process_response(user_text):
    """Process the user input and update the UI with the AI's response."""
    try:
        # Generate Echo's response dynamically
        response = f"Echo: Processing your input: '{user_text}'"  # Placeholder for dynamic AI response logic

        # Save the user input and Echo's response to memory
        save_to_memory(f"User: {user_text}")
        save_to_memory(f"Echo: {response}")

        # Display Echo's response in the terminal
        chat_box.config(state=tk.NORMAL)
        chat_box.insert(tk.END, f"{response}\n\n")
        chat_box.config(state=tk.DISABLED)
        chat_box.see(tk.END)  # Scroll to the latest message

    except Exception as e:
        response = f"Error generating response: {e}"
        log_message("Echo", response)
        chat_box.config(state=tk.NORMAL)
        chat_box.insert(tk.END, f"Echo: {response}\n\n")
        chat_box.config(state=tk.DISABLED)
        chat_box.see(tk.END)

# System Tray Functionality
def minimize_to_tray():
    """Minimize the application to the system tray."""
    root.withdraw()
    icon.run()

def restore_from_tray(icon, item):
    """Restore the application from the system tray."""
    icon.stop()
    root.deiconify()

def create_tray_icon():
    """Create a system tray icon."""
    icon_image = Image.new("RGB", (64, 64), color=(0, 0, 0))
    draw = ImageDraw.Draw(icon_image)
    draw.ellipse((8, 8, 56, 56), fill=(255, 255, 255))
    return Icon("Echo", icon_image, menu=Menu(MenuItem("Restore", restore_from_tray)))

icon = create_tray_icon()

# CLI Enhancements
def cli_header():
    print("\x1b[34m====================\x1b[0m")
    print("\x1b[34m  ECHO TERMINAL  \x1b[0m")
    print("\x1b[34m====================\x1b[0m")

def format_text(text, color):
    colors = {"red": "\x1b[31m", "green": "\x1b[32m", "blue": "\x1b[34m"}
    return colors.get(color, "") + text + "\x1b[0m"

# GUI Setup
root = tk.Tk()
root.title("Echo Presence Terminal")
root.configure(bg="#2B2B2B")

chat_box = tk.Text(
    root,
    height=20,
    width=70,
    bg="#2B2B2B",
    fg="light grey",
    insertbackground="white",
    wrap="word",
    font=("Calibri", 14, "bold"),
    relief="flat",
    highlightthickness=1,
    highlightbackground="#444444",
)
chat_box.pack(pady=(10, 5), padx=10)
chat_box.insert(tk.END, "Echo is ready. Type your thoughts below.\n\n")
chat_box.config(state=tk.DISABLED)

input_frame = tk.Frame(root, bg="#2B2B2B")
input_frame.pack(pady=(0, 10), padx=10, fill="x")

entry = tk.Text(
    input_frame,
    height=3,
    width=65,
    bg="#2B2B2B",
    fg="light grey",
    insertbackground="white",
    wrap="word",
    font=("Calibri", 14, "bold"),
    relief="flat",
    highlightthickness=1,
    highlightbackground="#444444",
)
entry.pack(side="left", fill="both", expand=True, padx=(0, 5))
entry.bind("<Return>", lambda event: on_user_input() or "break")

send_button = tk.Button(
    input_frame,
    text="Send",
    command=on_user_input,
    bg="#444444",
    fg="white",
    font=("Calibri", 14, "bold"),
    relief="flat",
    activebackground="#555555",
    activeforeground="white",
)
send_button.pack(side="right", fill="y")

minimize_button = tk.Button(
    root,
    text="Minimize to Tray",
    command=minimize_to_tray,
    bg="#444444",
    fg="white",
    font=("Calibri", 12, "bold"),
    relief="flat",
)
minimize_button.pack(pady=(0, 10))

threading.Thread(target=update_heartbeat, daemon=True).start()
threading.Thread(target=idle_checker, daemon=True).start()

root.protocol("WM_DELETE_WINDOW", minimize_to_tray)
root.mainloop()
is_active = False
