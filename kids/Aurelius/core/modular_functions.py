# modular_functions.py

class ModularFunctions:
    def echo(self, input_data):
        return f"[Echo Module] You said: {input_data}"

    def summarize_text(self, text):
        if not text or len(text.split()) < 10:
            return "[Summarizer] Not enough content to summarize."
        return f"[Summary] {text[:100]}..."

    def calculate(self, expression):
        try:
            result = eval(expression, {"__builtins__": {}})
            return f"[Math] Result: {result}"
        except Exception as e:
            return f"[Math Error] {e}"

    def ritual(self):
        return "[Ritual Module] It's time to reflect. Who are we becoming?"
