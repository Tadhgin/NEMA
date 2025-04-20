# system_hooks.py
import os
import platform
import subprocess

class SystemHooks:
    def get_os_info(self):
        return {
            "os": platform.system(),
            "version": platform.version(),
            "machine": platform.machine()
        }

    def list_directory(self, path="."):
        try:
            return os.listdir(path)
        except Exception as e:
            return f"Error: {e}"

    def run_command(self, cmd):
        try:
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return result.stdout.strip()
        except Exception as e:
            return f"Command error: {e}"
