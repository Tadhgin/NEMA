import fs from "fs";
export const loadConfig = (filePath) => {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
        console.error("Failed to load config:", error);
        return null;
    }
};