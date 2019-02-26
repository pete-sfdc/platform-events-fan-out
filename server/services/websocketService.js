const ws = require('ws');
const WebSocketServer = ws.Server;
const CLIENTS = [];
let wss;

/*
WS Switch Values
    0 - not ready to receive messages
    1 - ready to receive messages
*/

let startWebsocketServer = server => {
    wss = new WebSocketServer({ server });
    wss.on("connection", (ws) => {
        let newClient = {
            ws: ws,
            subs:[]
        };
        CLIENTS.push(newClient);
        console.log(`client connected: ${CLIENTS.length} active clients`);
        ws.on("message", (message) => {
            console.log(JSON.stringify(message));
            if(message["subs"]) {
                newClient.subs = message.subs;
            }
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
            if(client.ws.readyState === ws.OPEN) {
                client.ws.send(message);
            }
        });
    }
};