const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from Express Routes!');
});

router.get('/about', (req, res) => {
    res.send('About page!');
});

module.exports = router;
