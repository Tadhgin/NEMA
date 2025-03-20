import { debug } from "./debugTools.js";
import { logError } from "./errorReporter.js";

// Handle and log errors
export const handleError = (error, source = "Unknown") => {
    console.error("An error occurred:", error.message || error);
    debug("Error Caught", { message: error.message, stack: error.stack, source });
    logError(error, source);
};