import readline from "readline";
import { getAutoComplete } from "../utils/autoComplete.js";
import { applyTheme } from "../ui/themeManager.js";
import { cliHeader, formatText } from "../ui/cliEnhancements.js";

// Create CLI interface
export const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to ask a question in the CLI
export const askQuestion = (query, callback) => {
    cli.question(query, (answer) => {
        callback(answer);
    });
};

// Apply the theme
const theme = applyTheme("dark"); // Change to "light" for default
console.log(`Theme applied: Background ${theme.background}, Text ${theme.text}`);

// Display CLI header
cliHeader();
console.log(formatText("Welcome to Caelum Office!", "green"));

// Handle user input with auto-complete suggestions
cli.on("line", (input) => {
    const suggestions = getAutoComplete(input);

    if (suggestions.length > 0) {
        console.log(`Did you mean: ${suggestions.join(", ")}?`);
    }
});