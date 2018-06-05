const sfdcEventService = require('../services/sfdcEventService');
const sfdcAPIService = require('../services/sfdcAPIService');

const async = require('async');

console.log("Salesforce Initilization: START");

async.waterfall([
  (next) => {
    sfdcAPIService.init(null, next);
  },
  (next) => {
    sfdcEventService.init(null, next);
  }
],function (err, result) {
  console.log("Salesforce Initilization: COMPLETE");
});