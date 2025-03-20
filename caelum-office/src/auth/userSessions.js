const sessions = new Map();
export const startSession = (userId) => {
    const sessionId = Date.now().toString(36);
    sessions.set(sessionId, { userId, createdAt: new Date() });
    return sessionId;
};
export const getSession = (sessionId) => {
    return sessions.get(sessionId) || null;
};
export const endSession = (sessionId) => {
    sessions.delete(sessionId);
};