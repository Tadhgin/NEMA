import { commandDescriptions } from "../data/commandList.js";



export const getAutoComplete = (input) => {

    const commands = Object.keys(commandDescriptions);

    return commands.filter(cmd => cmd.startsWith(input));

};