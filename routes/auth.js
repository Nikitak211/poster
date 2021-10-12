//Third party packeges
const express = require('express');
const router = express.Router();

// Local imports
const AuthControll = require('../controler/AuthControl');

router.post('/register', AuthControll.register);
router.post('/', AuthControll.login);

module.exports = router;