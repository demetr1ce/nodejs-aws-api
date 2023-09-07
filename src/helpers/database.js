var AWS = require('aws-sdk');
var https = require('node:https');

AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
    endpoint: process.env.endpoint,
});

AWS.config.httpOptions['agent'] = new https.Agent({
    keepAlive: true,
    ciphers: 'ALL',
    secureProtocol: 'TLSv1_method'
});

process.on('uncaughtException', function (err) {
    logger.log('error','UNCAUGHT EXCEPTION - keeping process alive:',  err);
});

const db = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});

module.exports = db;