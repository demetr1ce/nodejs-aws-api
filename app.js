const server = require(`./server`);
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

require(`dotenv`).config();
server.createServer();