export const settings = {
    appName: "Caelum Office",
    version: "1.0.0",
    debugMode: true,
};

import { loadConfig } from "./configLoader.js";

const userConfig = loadConfig("userConfig.json");
console.log("Loaded Config:", userConfig);