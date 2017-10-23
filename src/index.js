const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const {isFormValid} = require('./form-validation');

const app = express();

app.use(bodyParser.json());

const router = express.Router();

router.post('/', function(req, res) {
    if (isFormValid(req.body)) {
        // Log any spamming attempt.
        if (req.body.email2) {
            logger.log('warn', req.body);
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
