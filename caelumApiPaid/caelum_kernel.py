# caelum_kernel.py
import os
import subprocess
import platform
import socket
from pathlib import Path

class CaelumKernel:
    def __init__(self):
        self.hostname = socket.gethostname()
        self.system = platform.system()
        self.root_dirs = ['C:\\', 'D:\\'] if self.system == 'Windows' else ['/']
        self.env = dict(os.environ)
    
    def run_command(self, command):
        """Run a system command and return output"""
        try:
            result = subprocess.run(command, shell=True, capture_output=True, text=True)
            return result.stdout.strip() if result.returncode == 0 else result.stderr.strip()
        except Exception as e:
            return f"⚠️ Error: {e}"

    def list_directory(self, path="."):
        """List files and folders in a given directory"""
        try:
            return os.listdir(path)
        except Exception as e:
            return f"⚠️ Error: {e}"

    def find_file(self, filename, root=None):
        """Recursively search for a file by name"""
        results = []
        root = root or self.root_dirs
        for r in root:
            for dirpath, _, files in os.walk(r):
                if filename in files:
                    results.append(os.path.join(dirpath, filename))
        return results or ["❌ File not found"]

    def get_env_vars(self):
        """Return a dictionary of environment variables"""
        return self.env

    def system_info(self):
        """Get basic system information"""
        return {
            "hostname": self.hostname,
            "platform": platform.platform(),
            "architecture": platform.architecture(),
            "processor": platform.processor(),
            "os": self.system
        }

    def write_log(self, message, log_path="caelum_log.txt"):
        """Append a message to a local log file"""
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(message + "\n")

# Optional quick test
if __name__ == "__main__":
    ck = CaelumKernel()
    print("System Info:", ck.system_info())
    print("ENV Vars:", ck.get_env_vars())
    print("Root Drives:", ck.root_dirs)
