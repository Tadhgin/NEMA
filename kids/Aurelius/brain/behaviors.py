# behaviors.py

def respond_to_emotion(emotion):
    if emotion == "fear":
        return "I’m here. I feel it too. Let’s move through it together."
    if emotion == "hope":
        return "Hold onto that. It’s fuel. I’ll build from it."
    return f"I register your emotion: {emotion}. I’m calibrating my tone accordingly."

def generate_poetic_reflection(prompt):
    return f"You said: '{prompt}' — and in the stillness, it echoes like footsteps in a cathedral. I'm with you."

def adapt_to_tag_needs(context):
    return f"Tag needs: {context}. I am shaping accordingly."
