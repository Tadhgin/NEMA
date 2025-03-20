import fs from "fs";
export const logError = (error, source) => {
    const errorLog = `[${new Date().toISOString()}] ${source}: ${error.message}\n`;
    fs.appendFileSync("error.log", errorLog);
    console.error(`[ERROR] ${source}:`, error.message);
};