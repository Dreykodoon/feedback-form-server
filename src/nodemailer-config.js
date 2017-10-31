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

module.exports = {
    transporter,
    mailOptions,
};
