const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('./configurations/logger-config');
const resourcesRouter = require('./routes/resources-router');
const {checkEnvironmentVariables} = require('./env-validation');

checkEnvironmentVariables();

const app = express();
app.use(bodyParser.json());
app.use(session({saveUninitialized: false, resave: false, secret: 'NOT_SO_SECRET', cookie: {maxAge: 600000}}));

app.use('/resources', resourcesRouter);

app.listen(8080, function() {
    logger.log('info', 'Feedback Form server started. Listening on port 8080!');
});
