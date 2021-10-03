const express = require('express');
const router = express.Router();

const AuthControll = require('../controller/AuthControll');

router.post('/register',  AuthControll.register);
router.post('/login',  AuthControll.login);

    module.exports = router;