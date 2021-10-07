//Third party packeges
const express = require('express');
const router = express.Router();
const bcrypt = require('Bcryptjs')

//My imports
const User = require('../models/user')

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.redirect('/');
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.redirect('/');
    }

    req.session.isAuth = true
    res.redirect('/');
});

module.exports = router;