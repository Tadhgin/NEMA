const notificationQueue = [];



export const addNotification = (message) => {

    notificationQueue.push({ message, timestamp: new Date() });

};



export const processNotifications = () => {

    while (notificationQueue.length) {

        const notification = notificationQueue.shift();

        console.log(`Notification: ${notification.message}`);

    }

};

