const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');

const app = express();

app.use(bodyParser.json());

const router = express.Router();

router.post('/', function(req, res) {
    if (req.body.email2) {
        logger.log('warn', req.body);
    }
    res.send('Message forwarded successfully!');
});

app.use('/app', router);

app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});
