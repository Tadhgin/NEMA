const events = {};



export const on = (event, callback) => {

    if (!events[event]) events[event] = [];

    events[event].push(callback);

};



export const emit = (event, data) => {

    if (events[event]) {

        events[event].forEach((callback) => callback(data));

    }

};