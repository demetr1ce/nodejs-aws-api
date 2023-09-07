var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
    endpoint: process.env.endpoint,
});

process.on('uncaughtException', function (err) {
    logger.log('error','UNCAUGHT EXCEPTION - keeping process alive:',  err);
});

const db = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});

module.exports = db;