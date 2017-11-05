const nodemailer = require('nodemailer');
const logger = require('./logger-config');

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

const transporter = nodemailer.createTransport({
    host:   'smtp.gmail.com',
    port:   587,
    secure: false, // true for 465, false for other ports
    auth:   {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASS,
    }
});

const mailOptions = {
    from:    process.env.EMAIL_SENDER,
    to:      process.env.EMAIL_RECEIVER,
    subject: 'Message from feedback.form',
};

const enhanceMailOptions = (formFields) => {
    const {name, email, message} = formFields;
    const emailText = `You received the following message from ${name} <${email}> : \n\n${message}`;

    return Object.assign({}, mailOptions, {text: emailText});
};

module.exports = {
    transporter,
    enhanceMailOptions,
};
