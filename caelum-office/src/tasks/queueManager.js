const queue = [];



export const addToQueue = (task) => {

    queue.push(task);

    console.log(`Task added to queue: ${task.name}`);

};



export const processQueue = () => {

    while (queue.length) {

        const task = queue.shift();

        console.log(`Processing task: ${task.name}`);

        task.execute();

    }

};

