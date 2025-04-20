import datetime

def get_timestamp():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def log_mood():
    print("✨ Welcome to DreamTracker ✨")
    print("How are you feeling right now?")
    mood = input("Mood: ")
    note = input("Anything you'd like to add? (optional): ")

    timestamp = get_timestamp()
    entry = f"{timestamp} | Mood: {mood} | Note: {note if note else '—'}\n"

    with open("dream_log.txt", "a", encoding="utf-8") as file:
        file.write(entry)

    print("\n✅ Mood logged! Thank you.\n")

if __name__ == "__main__":
    log_mood()
