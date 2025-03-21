const sessionCache = new Map();

export const storeSessionData = (sessionId, data) => {
    sessionCache.set(sessionId, data);
};

export const getSessionData = (sessionId) => {
    return sessionCache.get(sessionId) || null;
};

export const clearSessionData = (sessionId) => {
    sessionCache.delete(sessionId);
};