const conversationHistory = [];



export const addMessageToMemory = (user, message) => {

    conversationHistory.push({ user, message, timestamp: new Date().toISOString() });

};



export const getRecentMessages = (count = 10) => {

    return conversationHistory.slice(-count);

};

