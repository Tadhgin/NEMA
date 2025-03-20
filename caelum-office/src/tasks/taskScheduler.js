const tasks = [];

// Schedule a task
export const scheduleTask = (name, interval, callback) => {
    const task = setInterval(callback, interval);
    tasks.push({ name, task });
    console.log(`Task scheduled: ${name}`);
};

// Cancel a task
export const cancelTask = (name) => {
    const taskIndex = tasks.findIndex((t) => t.name === name);

    if (taskIndex > -1) {
        clearInterval(tasks[taskIndex].task);
        tasks.splice(taskIndex, 1);
        console.log(`Task canceled: ${name}`);
    }
};