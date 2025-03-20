export const cliHeader = () => {
    console.log("\x1b[34m====================\x1b[0m");
    console.log("\x1b[34m  CAELUM OFFICE  \x1b[0m");
    console.log("\x1b[34m====================\x1b[0m");
};
export const formatText = (text, color) => {
    const colors = { red: "\x1b[31m", green: "\x1b[32m", blue: "\x1b[34m" };
    return colors[color] + text + "\x1b[0m";
};