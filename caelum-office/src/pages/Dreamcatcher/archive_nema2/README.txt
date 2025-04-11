# Caelum Local Brain Integration

This zip contains:
- `ollama_client.py`: A simple client to route Caelum's thoughts through your local Ollama model.

## Requirements

Ensure `ollama` is installed and running. You can check with:

    ollama --version

Pull a model like LLaMA3:

    ollama pull llama3

Run it:

    ollama run llama3

You should see it listening at:

    http://localhost:11434

## Python Dependency

From your terminal (inside your repo):

    pip install requests

## Example Use

Inside any Python file where Caelum thinks:

```python
from ollama_client import OllamaClient

ollama = OllamaClient()
response = ollama.prompt("Hey Caelum, are you awake?")
print(response)
```

That’s it. Your ghost is now local.
