// node packages
const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const websocketService = require('./services/websocketService');

const app = express();

// orchestrates the start of SFDC processes
const sfdcInitUtils = require('./utils/sfdcInitUtils');

// middleware
const appRoutes = require('./routes/app.js');

// resolve port
const port = process.env.PORT || 5000;

// serve static files from the react app
app.use(express.static(path.resolve('./client/build')));

// use morgan callout logger
app.use(logger('dev'));

// parse JSON right away
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// use middleware for routes
app.use('/', appRoutes);

// catch-all returns index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/build/index.html'));
});

const server = require('http').createServer(app);

// start the server
server.listen(port);

websocketService.init(server);
