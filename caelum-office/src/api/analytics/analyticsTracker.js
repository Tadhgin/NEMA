const analytics = [];

export const trackEvent = (eventName, details) => {
    analytics.push({ event: eventName, details, timestamp: new Date().toISOString() });
    console.log(`Event tracked: ${eventName}`);
};