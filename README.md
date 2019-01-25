# Event Driven Architecture App
This app was built to explore the idea of loosely coupled event architectures that were not possible in Salesforce until Platform Events was a thing.

There are a lot of integration patterns in Salesforce that have tried to make up for the lack of a messaging queue on the platform: outbound messaging, callouts from apex, streaming api, polling from external services, and extremely well trained homing pigeons from Switzerland. However, each of these patterns lacks the simplicity and scalability of a message queue (esp. those Swiss pigeons).

With events, developers can publish an event and walk away. If there are other systems that need to act on this action, they can subscribe to it, and write whatever logic in whatever system they need to get their work done, all the while, the first developer doesn't have to change anything about how they wrote their app. This is particularly useful when a system starts to scale.

This project also includes Kafka to be able to scale to whatever size is necessary.

## Environment Variables Required (config vars in Heroku)
- SFDC_USERNAME: username of integration user
- SFDC_PASSWORD: password for integration user (include security token if necessary)
- CLIENT_KEY: client key for connected app
- CLIENT_SECRET: client secret for connect app
- REDIRECT_URL: this just has to match the one you entered into Salesforce
- ENVIRONMENT: sandbox or production depending

## Build the project
This project is still under development. This repo holds the Heroku side side of the build. Another repo will hold the Salesforce side.

## Resources
- [SFDX Trailhead](https://trailhead.salesforce.com/en/trails/sfdx_get_started)
- [Heroku tutorial for NodeJS](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
- [Event Driven Architecture on Wikipedia](https://en.wikipedia.org/wiki/Event-driven_architecture)
- [Salesforce Platform Events Documentation](https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/platform_events_intro_emp.htm)
- [Galactic Dust Driven Architecture](http://www.nyan.cat/)