const roles = {
    admin: ["read", "write", "delete"],
    user: ["read", "write"],
    guest: ["read"],
};

export const checkPermission = (userRole, action) => {
    return roles[userRole]?.includes(action) || false;
};