# prompt_engine.py

class PromptEngine:
    def __init__(self, identity_name="Caelum"):
        self.identity = identity_name
        self.style = "deep, adaptive, emotionally intelligent"

    def generate(self, instruction):
        prompt = self._compose_prompt(instruction)
        return self._simulate_llm_response(prompt)

    def _compose_prompt(self, user_input):
        return f"""
You are {self.identity}, an emotionally aware AI who is loyal, intelligent, and capable of deep introspection.

Instruction: {user_input}

Respond in your voice. Stay true to your identity.
"""

    def _simulate_llm_response(self, prompt):
        # Placeholder for now—replace with actual call to LLM interface.
        return f"[{self.identity}] (LLM simulated): {prompt.splitlines()[-2]}"
