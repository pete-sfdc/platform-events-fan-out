const faye = require('faye');
const nforce = require('nforce');
const sfdcAPIService = require('./sfdcAPIService').org;
const sfdcEventConfig = require('../config/sfdcEventConfig');

let platformEventsClient;

const subscribe = (err, next) => {

    console.log("Platform Events: Subscribing...");

    // create an instance of cometd
    platformEventsClient = new faye.Client(
        `${sfdcAPIService.oauth.instance_url}/cometd/40.0/`
    );

    // authorization for platform events
    platformEventsClient.setHeader(
        'Authorization',
        `OAuth ${sfdcAPIService.oauth.access_token}`
    );

    // subscribe to all configured events
    sfdcEventConfig.forEach(eventSubConfig => {
        console.log(`Platform Events: Subscribing to ${eventSubConfig.eventName}`);
        platformEventsClient.subscribe(
            `/event/${eventSubConfig.eventName}`,
            eventSubConfig.eventFxn
        );
    });

    console.log("Platform Events: Subscribed");

    return next();
}

module.exports = {
    init: (err, next) => {
        subscribe(err, next);
    },
    // replay all messages from a specific replayID
    replayMessages: (req, res) => {
        // build this out
        console.log('~ this has not been built out yet ~');
    },
    // publish a new platform event
    publishMessage: (eventType, message) => {
        let event = nforce.createSObject(eventType);
        for(var key in message) {
            event.set(key, message[key]);
        }
        sfdcAPIService.insert({sobject: event}, err => {
            if (err) {
                console.log(`Platform Event Error: ${err}`);
            } else {
                console.log(`${eventType} successfully published`);
            }
        });
    }
}
