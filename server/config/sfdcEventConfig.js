const websocketService = require ('../services/websocketService');

module.exports = [
    {
        eventName: "Example_Event__e",
        eventFxn: (message) => {
            websocketService.broadcast(JSON.stringify(message));
        }
    }
];