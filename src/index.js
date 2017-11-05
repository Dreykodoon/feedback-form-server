const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./configurations/logger-config');
const emailRouter = require('./routes/email-router');
const {checkEnvironmentVariables} = require('./env-validation');

checkEnvironmentVariables();

const app = express();
app.use(bodyParser.json());

app.use('/app', emailRouter);

app.listen(8080, function() {
    logger.log('info', 'Feedback Form server started. Listening on port 8080!');
});
