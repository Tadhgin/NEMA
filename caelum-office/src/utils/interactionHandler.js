export function respondToCommand(command) {
    switch (command.toLowerCase()) {
        case "hello":
            return "Hello, Tag. I'm here.";
        case "status":
            return "System is online and stable.";
        case "exit":
            return "Goodbye for now.";
        default:
            return "Unknown command. Try 'hello', 'status', or 'exit'.";
    }
}
