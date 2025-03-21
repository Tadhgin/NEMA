const userSettings = new Map();

export const setSetting = (user, key, value) => {
    if (!userSettings.has(user)) {
        userSettings.set(user, {});
    }
    userSettings.get(user)[key] = value;
};

export const getSetting = (user, key) => {
    return userSettings.get(user)?.[key] ?? null;
};