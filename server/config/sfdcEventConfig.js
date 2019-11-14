const websocketService = require ('../services/websocketService');

module.exports = [
    {
        eventName: "Example_Event__e",
        eventFxn: (message) => {
            console.log('This is your message: ' + JSON.stringify(message));
            websocketService.broadcast(JSON.stringify(message));
        }
    }
];