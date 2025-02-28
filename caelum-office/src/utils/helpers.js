export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  export const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
  };
  