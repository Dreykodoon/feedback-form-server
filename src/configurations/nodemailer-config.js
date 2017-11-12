const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:   'smtp.gmail.com',
    port:   587,
    secure: false, // true for 465, false for other ports
    /* if 'requireTLS' is true and 'secure' is false then Nodemailer tries to use STARTTLS even
        if the server does not advertise support for it. If the connection can not be encrypted then message is not sent */
    requireTLS: true,
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
