const roles = {
    admin: ["read", "write", "execute"],
    user: ["read"],
};

export const checkPermission = (role, action) => {
    return roles[role]?.includes(action) ?? false;
};