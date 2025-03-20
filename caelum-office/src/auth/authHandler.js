import { startSession } from "./userSessions.js";
import { hashPassword } from "../security/cryptoUtils.js";
import { checkPermission } from "../security/authMiddleware.js";
import { logSecurityEvent } from "../logging/securityEvents.js";

// User database
export const users = {
    admin: { password: "securepassword123" },
};

// Authenticate user credentials
export const authenticate = (username, password) => {
    return users[username]?.password === password;
};

// Log in a user
export const loginUser = (username, password) => {
    if (!users[username] || users[username].password !== password) {
        logSecurityEvent("Failed Login Attempt", { username });
        return "Invalid credentials.";
    }
    const sessionId = startSession(username);
    return `Login successful. Session ID: ${sessionId}`;
};

// Register a new user
export const registerUser = (username, password) => {
    const hashedPassword = hashPassword(password);
    users[username] = { password: hashedPassword, role: "user" };
    return `User ${username} registered successfully.`;
};

// Authorize an action for a user
export const authorizeAction = (user, action) => {
    return checkPermission(user.role, action);
};