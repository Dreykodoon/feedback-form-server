const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const {isFormValid} = require('./form-validation');
const {transporter, enhanceMailOptions} = require('./nodemailer-config');

const app = express();

app.use(bodyParser.json());

const router = express.Router();

router.post('/', function(req, res) {
    if (isFormValid(req.body)) {
        const spammingAttempt = !!req.body.email2;
        if (spammingAttempt) {
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

app.use('/app', router);

app.listen(8080, function() {
    logger.log('info', 'Feedback Form server started. Listening on port 8080!');
});
