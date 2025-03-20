const events = {};

// Register an event listener
export const on = (event, callback) => {
    if (!events[event]) events[event] = [];
    events[event].push(callback);
};

// Emit an event
export const emit = (event, data) => {
    if (events[event]) {
        events[event].forEach((callback) => callback(data));
    }
};

// Example task scheduling
import { scheduleTask } from "../tasks/taskScheduler.js";

scheduleTask("clearCache", 60000, () => console.log("Cache cleared!"));