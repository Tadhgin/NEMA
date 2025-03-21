import fs from "fs";

export const parseDocument = (filePath) => {
    try {
        return fs.readFileSync(filePath, "utf-8");
    } catch (error) {
        console.error("Error parsing document:", error);
        return null;
    }
};