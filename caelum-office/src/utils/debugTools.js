export const debug = (label, data) => {

    console.log(`[DEBUG] ${label}:`, JSON.stringify(data, null, 2));
};