import fs from "fs";

export const exportData = (filePath, data) => {

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Data exported to ${filePath}`);
};