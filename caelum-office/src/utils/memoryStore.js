const memory = new Map();



export const remember = (key, value) => {

    memory.set(key, value);

};



export const recall = (key) => {

    return memory.get(key) || "I don't remember that.";

};



export const forget = (key) => {

    memory.delete(key);

};