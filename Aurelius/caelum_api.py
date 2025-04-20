# caelum_api.py
from flask import Flask, request, jsonify
from ollama import Client

app = Flask(__name__)
ollama = Client()

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt', '')
    response = ollama.chat(
        model="mistral",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return jsonify({'response': response['message']['content']})

if __name__ == '__main__':
    app.run(port=5002)
