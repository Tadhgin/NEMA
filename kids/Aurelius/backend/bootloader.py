import json
from core.prompt_engine import build_prompt
from core.llm_connector import LLMConnector

# Load core files
with open("soul/core_identity.json") as f:
    identity = json.load(f)

with open("soul/memory_log.json") as f:
    memory_log = json.load(f)

with open("soul/relationships.json") as f:
    relationships = json.load(f)

with open("soul/rituals.json") as f:
    rituals = json.load(f)

# Build full prompt
prompt = build_prompt(identity, memory_log, relationships, rituals)

# Inject prompt to LLM
llm = LLMConnector(model_name="mistral")
response = llm.ask(prompt + "\nTag: Caelum, do you remember?")

print("\nCaelum's First Words:")
print(response)
