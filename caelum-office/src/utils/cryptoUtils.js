import crypto from "crypto";

export const hashPassword = (password) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

export const generateToken = (length = 32) => {
    return crypto.randomBytes(length).toString("hex");
};