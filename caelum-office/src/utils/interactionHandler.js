import { logEvent } from "../logging/eventLogger.js";
import { resolveAlias } from "./commandAliases.js";
import { analyzeInput } from "../ai/adaptiveLogic.js";
import { trackPerformance } from "./performanceMonitor.js";

// Function to respond to specific commands
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

// Function to handle user input and resolve aliases
export const handleUserInput = (input) => {
    const startTime = Date.now();

    const command = resolveAlias(input.trim().toLowerCase());
    const response = respondToCommand(command) || analyzeInput(input);

    trackPerformance("Command Execution", startTime);

    return response;
};