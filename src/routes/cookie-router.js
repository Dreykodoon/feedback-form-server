const express = require('express');

const router = express.Router();

router.post('/', function(req, res) {
    req.session.cookieSaved = true;
    req.session.save();

    res.send('Cookie created!');
});

module.exports = router;
