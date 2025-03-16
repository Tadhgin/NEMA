const scheduledTasks = [];



export const scheduleTask = (taskName, interval, callback) => {

    const task = setInterval(callback, interval);

    scheduledTasks.push({ taskName, task });

    console.log(`Task scheduled: ${taskName}`);

};



export const cancelTask = (taskName) => {

    const taskIndex = scheduledTasks.findIndex((t) => t.taskName === taskName);

    if (taskIndex > -1) {

        clearInterval(scheduledTasks[taskIndex].task);

        scheduledTasks.splice(taskIndex, 1);

        console.log(`Task canceled: ${taskName}`);

    }

};