export const commandDescriptions = {

    hello: "Greets the user.",

    status: "Displays system status.",

    exit: "Exits the application.",

    help: "Lists available commands.",

};



export const getCommandHelp = () => {

    return Object.entries(commandDescriptions)

        .map(([cmd, desc]) => `${cmd}: ${desc}`)

        .join("\n");

};