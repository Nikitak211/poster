//Third party packeges
const express = require('express');
const router = express.Router();
const bcrypt = require('Bcryptjs')

//Local imports
const User = require('../models/user')

router.post('/register', async (req, res) => {
    const {
        username,
        password,
        email
    } = req.body.options

    let user = await User.findOne({ email })

    if (user) {
        res.redirect('/register')
    } else {

    }

    const hashedPass = await bcrypt.hash(password, 12);

    user = new User({
        username,
        password: hashedPass,
        email
    })
    await user.save();
    res.redirect('/')
});

module.exports = router;