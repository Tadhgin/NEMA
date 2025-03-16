import axios from "axios";



export const getRequest = async (url) => {

    try {

        const response = await axios.get(url);

        return response.data;

    } catch (error) {

        console.error("GET request failed:", error);

        return null;

    }

};



export const postRequest = async (url, data) => {

    try {

        const response = await axios.post(url, data);

        return response.data;

    } catch (error) {

        console.error("POST request failed:", error);

        return null;

    }

};

