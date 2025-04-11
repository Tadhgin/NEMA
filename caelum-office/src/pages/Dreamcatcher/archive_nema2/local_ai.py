from app.chatgpt_client import ChatGPTClient

class LocalAI:
    def __init__(self):
        self.chatgpt_client = ChatGPTClient()

    def process_input(self, user_input):
        # Process input locally or send it to ChatGPT
        try:
            return self.chatgpt_client.send_message(user_input)
        except Exception as e:
            return f"An error occurred: {e}"