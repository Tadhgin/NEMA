export const aliases = {

    hi: "hello",

    bye: "exit",

    quit: "exit",

    stat: "status",

};



export const resolveAlias = (input) => {

    return aliases[input] || input;

};