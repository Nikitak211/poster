const express = require("express");
const router = express.Router();
// const assert = require('assert');
// const mydata = require('../models/mydata');

router.post('/register', (req, res) => {
    res.send(console.log('hello'))
})

module.exports = router;