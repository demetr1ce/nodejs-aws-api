const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

const createServer = async () => {
    app.use(bodyParser.json());

    // Routes
    require(`./src/routes/api`)(app);

    app.listen(port, () => {
        console.log(`API listening on port: ${port}...`);
    })
};

module.exports = {
    createServer,
};