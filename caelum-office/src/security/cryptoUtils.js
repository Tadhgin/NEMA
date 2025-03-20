import crypto from "crypto";

export const hashPassword = (password) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

export const generateToken = () => {
    return crypto.randomBytes(32).toString("hex");
};