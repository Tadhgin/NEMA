import WebSocket from "ws";



export const setupWebSocket = (server) => {

    const wss = new WebSocket.Server({ server });



    wss.on("connection", (ws) => {

        console.log("New WebSocket connection established.");



        ws.on("message", (message) => {

            console.log("Received:", message);

        });



        ws.send("Welcome to Caelum Office WebSocket!");

    });

};