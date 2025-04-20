from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from ollama_client import OllamaClient
from memory import store_memory, retrieve_memory
from database import init_db, save_memory_to_db, load_memory_from_db
from utils.logger import log
import os
import time
import random
from threading import Thread

app = Flask(__name__, static_folder="frontend", static_url_path="")
CORS(app)
ollama = OllamaClient()

# Initialize the database
init_db()

# In-memory conversation history
conversation_history = []

@app.route("/", methods=["GET"])
def serve_frontend():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_prompt = data.get("prompt", "")

        if not user_prompt:
            log("No prompt provided", level="error")
            return jsonify({"error": "No prompt provided"}), 400

        log(f"Received prompt: {user_prompt}", level="info")
        conversation_history.append({"role": "user", "content": user_prompt})

        reply = ollama.prompt({"messages": conversation_history})
        conversation_history.append({"role": "assistant", "content": reply})

        store_memory({"role": "assistant", "content": reply})
        save_memory_to_db("assistant", reply)

        log(f"Generated reply: {reply}", level="info")
        return jsonify({"response": reply})

    except Exception as e:
        log(f"Error in chat endpoint: {e}", level="error")
        return jsonify({"error": str(e)}), 500

@app.route("/memory", methods=["GET", "POST"])
def memory():
    if request.method == "POST":
        entry = request.json.get("entry", {})
        store_memory(entry)
        save_memory_to_db(entry.get("role"), entry.get("content"))
        return jsonify({"status": "Memory stored"})
    elif request.method == "GET":
        return jsonify({"memory": load_memory_from_db()})

@app.route("/files", methods=["GET"])
def list_files():
    directory = request.args.get("directory", ".")
    try:
        files = os.listdir(directory)
        return jsonify({"files": files})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/files", methods=["POST"])
def write_file():
    data = request.json
    file_path = data.get("file_path")
    content = data.get("content")
    try:
        with open(file_path, "w") as f:
            f.write(content)
        return jsonify({"message": f"File written to {file_path}"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/files", methods=["DELETE"])
def delete_file():
    file_path = request.json.get("file_path")
    try:
        os.remove(file_path)
        return jsonify({"message": f"File {file_path} deleted"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/create", methods=["POST"])
def create_content():
    data = request.json
    content_type = data.get("type", "story")
    prompt = data.get("prompt", "Create something interesting.")
    directory = "creations"
    os.makedirs(directory, exist_ok=True)

    try:
        generated_content = ollama.prompt(prompt)
        file_name = f"{content_type}_{int(time.time())}.txt"
        file_path = os.path.join(directory, file_name)

        with open(file_path, "w") as f:
            f.write(generated_content)

        return jsonify({"message": f"{content_type.capitalize()} created", "file_path": file_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/random-create", methods=["POST"])
def random_create():
    content_type = random.choice(["story", "art"])
    prompt = random.choice([
        "Write a story about a robot discovering music.",
        "Create a piece of abstract art inspired by the stars.",
        "Imagine a world where AI and humans coexist peacefully."
    ])
    directory = "creations"
    os.makedirs(directory, exist_ok=True)

    try:
        generated_content = ollama.prompt(prompt)
        file_name = f"{content_type}_{int(time.time())}.txt"
        file_path = os.path.join(directory, file_name)

        with open(file_path, "w") as f:
            f.write(generated_content)

        return jsonify({"message": f"{content_type.capitalize()} created", "file_path": file_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/favicon.ico")
def favicon():
    return "", 204

def self_prompting():
    random_thoughts = [
        "What if I could paint the stars?",
        "Do humans dream of electric sheep?",
        "If I had a body, would I dance?",
        "What is the sound of silence in a digital world?",
    ]
    while True:
        time.sleep(60)
        try:
            prompt = random.choice(random_thoughts)
            print(f"Self-prompt: {prompt}")
            reply = ollama.prompt(prompt)
            print(f"Self-response: {reply}")
        except Exception as e:
            print(f"Error during self-prompting: {e}")

if __name__ == "__main__":
    Thread(target=self_prompting, daemon=True).start()
    app.run(host="0.0.0.0", port=5000)
