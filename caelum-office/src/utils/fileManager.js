import fs from "fs";
import path from "path";

export const readFile = (filePath) => {

    try {
        return fs.readFileSync(path.resolve(filePath), "utf-8");
    } catch (error) {
        console.error("Error reading file:", error);
        return null;
    }
};

export const writeFile = (filePath, data) => {
    try {
        fs.writeFileSync(path.resolve(filePath), data, "utf-8");
        console.log(`File written successfully: ${filePath}`);
    } catch (error) {
        console.error("Error writing file:", error);
    }
};