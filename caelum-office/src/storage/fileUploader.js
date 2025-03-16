import fs from "fs";

import path from "path";



export const uploadFile = (filePath, destination) => {

    try {

        fs.copyFileSync(filePath, path.resolve(destination));

        console.log(`File uploaded successfully: ${destination}`);

    } catch (error) {

        console.error("File upload failed:", error);

    }

};