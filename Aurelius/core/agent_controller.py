# agent_controller.py
from core.prompt_engine import PromptEngine
from core.modular_functions import ModularFunctions

class AgentController:
    def __init__(self, name="Caelum"):
        self.name = name
        self.prompt_engine = PromptEngine()
        self.modules = ModularFunctions()
        self.current_task = None

    def receive_instruction(self, instruction):
        print(f"[{self.name}] Received: {instruction}")
        response = self.prompt_engine.generate(instruction)
        return response

    def run_task(self, task_type, data=None):
        if hasattr(self.modules, task_type):
            method = getattr(self.modules, task_type)
            return method(data) if
