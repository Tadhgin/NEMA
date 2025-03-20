export const analyzeInput = (input) => {
    if (input.includes("weather")) return "Fetching the latest weather data...";
    if (input.includes("reminder")) return "Would you like me to set a reminder for you?";
    return "I'm still learning, but I'm here to help! Because I am the best";
};