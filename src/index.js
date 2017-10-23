const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const {isFormValid} = require('./form-validation');

const app = express();

app.use(bodyParser.json());

const router = express.Router();

router.post('/', function(req, res) {
    if (isFormValid(req.body)) {
        const spammingAttempt = !!req.body.email2;
        if (spammingAttempt) {
            logger.log('warn', req.body);
        }
        else if (process.env.NODE_ENV === 'production') {
            // Add logic for sending emails here
            // ...
            console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
        }
        res.send('Message forwarded successfully!');
    }
    else {
        res.status(400).send({error: 'Error while sending message!'});
    }
});

app.use('/app', router);

app.listen(8080, function() {
    logger.log('info', 'Feedback Form server started. Listening on port 8080!');
});
