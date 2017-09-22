const express = require('express');
const app = express();
const router = express.Router();

router.post('/', function(req, res) {
    res.send('received test');
});

app.use('/app', router);

app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});
