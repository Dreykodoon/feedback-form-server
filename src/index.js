const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const path = require('path');

const fileName = path.join(__dirname, 'logfile.log');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: fileName, json: false})
    ]
});

const app = express();

app.use(bodyParser.json());

const router = express.Router();

router.post('/', function(req, res) {
    logger.log('info', req.body);
    res.send('received test');
});

app.use('/app', router);

app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});
