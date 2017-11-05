const logger = require('./configurations/logger-config');

const checkEnvVars = () => {
    if (process.env.NODE_ENV === 'production'
        && !process.env.EMAIL_SENDER
        && !process.env.EMAIL_PASS
        && !process.env.EMAIL_RECEIVER) {
        let missingEnvVars = process.env.EMAIL_SENDER ? '' : 'EMAIL_SENDER ';
        missingEnvVars += process.env.EMAIL_PASS ? '' : 'EMAIL_PASS ';
        missingEnvVars += process.env.EMAIL_RECEIVER ? '' : 'EMAIL_RECEIVER ';

        logger.log('error', 'The following env variables couldn\'t be found: %s', missingEnvVars);
        throw new Error(`The following env variables couldn\'t be found: ${missingEnvVars}`);
    }
};

module.exports = {
    checkEnvironmentVariables: checkEnvVars,
};
