const ws = require('ws');
const WebSocketServer = ws.Server;
const CLIENTS = [];
let wss;

let startWebsocketServer = server => {
    wss = new WebSocketServer({ server });
    wss.on("connection", (ws) => {
        CLIENTS.push(ws);
        console.log(`client connected: ${CLIENTS.length} active clients`);
        ws.on("message", (message) => {
            // stay quiet
        });
        ws.on("close", (client) => {
            console.log(`client disconnected: ${CLIENTS.length} active clients`);
            CLIENTS.splice(CLIENTS.indexOf(client),1);
        });
        ws.on("error", (client) => {
            console.log(`client disconnected: ${CLIENTS.length} active clients`);
            CLIENTS.splice(CLIENTS.indexOf(client),1);
        });
    });
}

module.exports = {
    init:(server) => {
        startWebsocketServer(server);
    },
    broadcast:(message) => {
        console.log(`sending message to ${CLIENTS.length} client(s)`);
        CLIENTS.forEach(client => {
            if(client.readyState === ws.OPEN) {
                client.send(message);
            }
        });
    }
};