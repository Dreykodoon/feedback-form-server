const express = require('express');
const {isFormValid, isSpammingAttempt} = require('./form-validation');
const {transporter, enhanceMailOptions} = require('../configurations/nodemailer-config');
const logger = require('../configurations/logger-config');

const router = express.Router();

router.post('/', function(req, res) {
    if (isFormValid(req.body)) {
        if (isSpammingAttempt(req.body)) {
            logger.log('warn', req.body);
            res.send('Message forwarded successfully!');
        }
        else if (process.env.NODE_ENV === 'production') {
            transporter.sendMail(enhanceMailOptions(req.body), (error, info) => {
                if (error) {
                    logger.log('warn', error);
                    res.status(400).send({error: 'Error while sending message!'});

                    return;
                }
                logger.log('info', 'Message sent: %s', info.messageId);
                res.send('Message forwarded successfully!');
            });
        }
        else {
            // Dev mode
            res.send('Message forwarded successfully!');
        }
    }
    else {
        res.status(400).send({error: 'Error while sending message!'});
    }
});

module.exports = router;
