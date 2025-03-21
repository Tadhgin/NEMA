export const formatJSON = (data) => {

    return JSON.stringify(data, null, 2);
};

export const parseJSON = (jsonString) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Invalid JSON:", error);
        return null;
    }
};