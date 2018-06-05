const express = require('express');
const router = express.Router();
// const kafkaService = require('../services/kafkaService');
const sfdcEventService = require('../services/sfdcEventService');

router.get('/api/kafka', (req, res) => {
    // kafkaService.getMessages(req, res);
    console.log('Kafka Service is not available');
});

router.get('/api/sfdc-events', (req, res) => {
    sfdcEventService.replayMessages(req, res);
});

module.exports = router;
