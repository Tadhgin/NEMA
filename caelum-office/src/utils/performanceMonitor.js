const performanceData = [];
export const trackPerformance = (label, startTime) => {
    const duration = Date.now() - startTime;
    performanceData.push({ label, duration });
    console.log(`[PERF] ${label} executed in ${duration}ms`);
};
export const getPerformanceStats = () => {
    return performanceData;
};