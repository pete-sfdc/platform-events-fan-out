const websocketService = require ('../services/websocketService');

module.exports = [
    {
        eventName: "Order_Change__e",
        eventFxn: (message) => {
            websocketService.broadcast(JSON.stringify(message));
        }
    }
];