const users = [];

export const addUser = (username) => {
    users.push({ username, createdAt: new Date().toISOString() });
};

export const listUsers = () => {
    return users.map((user) => user.username).join(", ");
};