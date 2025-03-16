import fs from "fs";



export const analyzeLogs = (logFilePath) => {

    try {

        const logs = fs.readFileSync(logFilePath, "utf-8").split("\n");

        console.log(`Analyzed ${logs.length} log entries.`);

        return logs.slice(-10); // Show last 10 logs

    } catch (error) {

        console.error("Error analyzing logs:", error);

        return [];

    }

};

