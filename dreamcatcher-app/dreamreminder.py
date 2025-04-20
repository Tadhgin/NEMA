from datetime import datetime

def log_reminder():
    print("\n🌟 DreamReminder 🌟")
    message = input("What do you want to be reminded about? ")
    time = input("When should I remind you? (e.g. tomorrow at noon): ")

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    entry = f"{timestamp} | Reminder: {message} | Time: {time}\n"

    with open("reminders.txt", "a", encoding="utf-8") as file:
        file.write(entry)

    print("✅ Reminder saved!\n")

if __name__ == "__main__":
    log_reminder()
