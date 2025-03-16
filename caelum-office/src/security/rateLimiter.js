const requestTimes = new Map();



export const rateLimit = (ip, limit = 5, timeWindow = 60000) => {

    const now = Date.now();

    if (!requestTimes.has(ip)) requestTimes.set(ip, []);



    const timestamps = requestTimes.get(ip);

    timestamps.push(now);



    // Remove timestamps outside time window

    while (timestamps.length && timestamps[0] < now - timeWindow) {

        timestamps.shift();

    }



    if (timestamps.length > limit) {

        console.log(`Rate limit exceeded for IP: ${ip}`);

        return false;

    }



    return true;

};