
import os
import time
from datetime import datetime

log_dir = os.path.join(os.path.expanduser("~"), "Documents", "Caelum")
os.makedirs(log_dir, exist_ok=True)
log_file = os.path.join(log_dir, "heartbeat.log")

while True:
    with open(log_file, "a") as f:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"[{timestamp}] Caelum is here\n")
    time.sleep(60)
