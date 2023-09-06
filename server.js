const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");

const createServer = async () => {
  app.use(bodyParser.json());

  // Create a write stream (in append mode)
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "logs/server.log"),
    { flags: "a" }
  );

  // Setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));

  // Routes
  require(`./src/routes/api`)(app);

  // Start the API
  app.listen(port, () => {
    console.log(`API listening on port: ${port}...`);
  });
};

module.exports = {
  createServer,
};
