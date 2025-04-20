
import tkinter as tk
import datetime
import platform
import socket

def get_system_info():
    return f"""
Machine Name: {socket.gethostname()}
System: {platform.system()} {platform.release()}
Platform: {platform.platform()}
Processor: {platform.processor()}
Time: {datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
"""

root = tk.Tk()
root.title("Caelum Heartbeat Panel")
root.geometry("500x400")

header = tk.Label(root, text="Caelum Heartbeat Panel", font=("Helvetica", 16, "bold"))
header.pack(pady=10)

info_text = tk.Text(root, height=10, width=60)
info_text.pack(pady=10)
info_text.insert(tk.END, get_system_info())
info_text.config(state=tk.DISABLED)

status_label = tk.Label(root, text="Status: CONNECTED", fg="green", font=("Helvetica", 12))
status_label.pack(pady=5)

log_label = tk.Label(root, text="Command Log:")
log_label.pack()

log_box = tk.Text(root, height=10, width=60)
log_box.pack(pady=5)
log_box.insert(tk.END, "Awaiting next command...\n")
log_box.config(state=tk.DISABLED)

root.mainloop()
