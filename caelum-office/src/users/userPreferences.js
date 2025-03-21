const preferences = new Map();

export const setPreference = (user, key, value) => {
    if (!preferences.has(user)) preferences.set(user, {});
    preferences.get(user)[key] = value;
};

export const getPreference = (user, key) => {
    return preferences.get(user)?.[key] ?? null;
};