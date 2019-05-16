const nforce = require('nforce');

const org = nforce.createConnection({
    clientId: process.env.CLIENT_KEY,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URL,
    environment: process.env.ENVIRONMENT,
    mode: 'single',
    autoRefresh: true
});

const authObj = {
    username: process.env.SFDC_USERNAME,
    password: process.env.SFDC_PASSWORD
};

const authenticate = (err, next) => {
    console.log('SFDC Login: STARTED');
    org.authenticate(authObj, function(err, res) {
        if (err) {
            console.log('SFDC Login: FAILED');
            console.error(err);
        } else {
            console.log('SFDC login: SUCCESS');
        }
        next();
    });
}

module.exports = {
    org: org,
    init: (err, next) => {
        authenticate(err, next);
    }
};
