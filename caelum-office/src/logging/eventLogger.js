import fs from "fs";



export const logEvent = (event, details) => {

    const logMessage = `[${new Date().toISOString()}] ${event}: ${JSON.stringify(details)}\n`;

    fs.appendFileSync("system.log", logMessage);

};