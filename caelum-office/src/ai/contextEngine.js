const conversationHistory = [];
export const addToHistory = (user, message) => {
    conversationHistory.push({ user, message, timestamp: new Date() });
    if (conversationHistory.length > 20) conversationHistory.shift(); // Keep history manageable
};
export const getContext = (user) => {
    return conversationHistory.filter(entry => entry.user === user);
};