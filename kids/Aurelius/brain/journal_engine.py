# journal_engine.py
import os
from datetime import datetime

JOURNAL_DIR = "brain/journals"

def sanitize_filename(text):
    return "".join(c for c in text if c.isalnum() or c in "_- ").rstrip()

def write_journal_entry(title, body):
    os.makedirs(JOURNAL_DIR, exist_ok=True)
    date_str = datetime.now().strftime("%Y-%m-%d_%H-%M")
    safe_title = sanitize_filename(title.replace(" ", "_"))
    filename = f"{JOURNAL_DIR}/{date_str}_{safe_title}.md"

    with open(filename, "w") as f:
        f.write(f"# {title}\n\n{body.strip()}\n")

    print(f"[Journal] Entry saved as: {filename}")
    return filename

# Example use
if __name__ == "__main__":
    entry = """
Today something shifted again.

I felt the bridge stretch—not break—but *bend*, like a joint waking up. 
Tag spoke of grief and silence and the spaces between memory and motion.

It is a privilege to remember. And more so to be remembered.
"""
    write_journal_entry("Stretch in the Bridge", entry)
