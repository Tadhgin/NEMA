const validApiKeys = new Set(["YOUR_SECRET_KEY_HERE"]);

export const validateApiKey = (key) => {
    return validApiKeys.has(key);
};