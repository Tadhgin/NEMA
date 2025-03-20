const securityLog = [];

export const logSecurityEvent = (eventType, details) => {
    securityLog.push({ eventType, details, timestamp: new Date() });
    console.log(`[SECURITY] ${eventType}: ${JSON.stringify(details)}`);
};