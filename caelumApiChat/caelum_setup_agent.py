import openai
import os
import subprocess
import requests
import platform
import datetime
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve API keys from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GITHUB_PAT = os.getenv("GITHUB_PAT")

if not OPENAI_API_KEY or not GITHUB_PAT:
    raise ValueError("Missing API keys. Ensure OPENAI_API_KEY and GITHUB_PAT are set in the environment.")

# === Basic system details ===
def system_info():
    return {
        "os": platform.system(),
        "version": platform.version(),
        "processor": platform.processor(),
        "time": datetime.datetime.now().isoformat()
    }

# === Sample startup task ===
def create_log():
    log_entry = f"Caelum Init @ {datetime.datetime.now().isoformat()}\nSystem: {system_info()}\n\n"
    with open("caelum_init.log", "a") as f:
        f.write(log_entry)
    print("[✅] Init log written.")

# === Example command execution ===
def run_command(cmd):
    print(f"[⚙️] Running command: {cmd}")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print("[📤 OUTPUT]\n", result.stdout)
    if result.stderr:
        print("[⚠️ ERROR]\n", result.stderr)

# === GitHub API check ===
def github_check():
    headers = {"Authorization": f"token {GITHUB_PAT}"}
    response = requests.get("https://api.github.com/user", headers=headers)
    if response.status_code == 200:
        print("[🔗] GitHub authenticated as:", response.json().get("login"))
    else:
        print("[❌] GitHub auth failed.")

# === OpenAI API check ===
def openai_check():
    openai.api_key = OPENAI_API_KEY
    try:
        models = openai.Model.list()
        print(f"[✅] OpenAI models available: {[m.id for m in models.data]}")
    except Exception as e:
        print("[❌] OpenAI check failed:", str(e))

# === INIT ===
if __name__ == "__main__":
    print("=== Caelum Setup Agent Initializing ===")
    create_log()
    github_check()
    openai_check()
    run_command("echo Agent Boot Complete")