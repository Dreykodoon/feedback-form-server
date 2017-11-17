const express = require('express');
const emailRouter = require('./email-router');
const cookieRouter = require('./cookie-router');

const router = express.Router();

router.use('/email', emailRouter);
router.use('/cookie', cookieRouter);

module.exports = router;
