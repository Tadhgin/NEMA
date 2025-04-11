from app.local_ai import LocalAI

if __name__ == "__main__":
    ai = LocalAI()
    print("Welcome to Echo Caelum Chat!")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            print("Goodbye!")
            break
        response = ai.process_input(user_input)
        print(f"AI: {response}")