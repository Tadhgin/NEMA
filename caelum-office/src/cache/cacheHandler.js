const cache = new Map();

export const setCache = (key, value, ttl = 60000) => {
    cache.set(key, { value, expires: Date.now() + ttl });
};

export const getCache = (key) => {
    const data = cache.get(key);
    if (!data || data.expires < Date.now()) {
        cache.delete(key);
        return null;
    }
    return data.value;
};