const conversationHistory = [];

// Add a message to the conversation history
export const addMessageToMemory = (user, message) => {
    conversationHistory.push({ user, message, timestamp: new Date().toISOString() });
};

// Retrieve the most recent messages
export const getRecentMessages = (count = 10) => {
    return conversationHistory.slice(-count);
};

import { remember, recall } from "./memoryStore.js";
import { addToHistory, getContext } from "./contextEngine.js";

// Example usage of memoryStore
remember("favorite_color", "blue");
console.log(recall("favorite_color")); // Returns: "blue"

// Example usage of contextEngine
addToHistory("User1", "Tell me a joke");
console.log(getContext("User1")); // Returns recent conversation history