const nodemailer = require('nodemailer');

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
    const emailText = 'You received the following message from ' + formFields.name + ' <' + formFields.email + '> :\n\n' + formFields.message;

    return Object.assign({}, mailOptions, {text: emailText});
};

module.exports = {
    transporter,
    enhanceMailOptions,
};
