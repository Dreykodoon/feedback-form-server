const winston = require('winston');
const path = require('path');

const fileName = path.join(__dirname, '../logfile.log');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({timestamp: true}), new (winston.transports.File)({
            filename: fileName,
            json:     false
        })
    ]
});

module.exports = logger;
