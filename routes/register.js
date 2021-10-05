const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('Bcryptjs')

router.post('/register', async (req, res) => {
    const {
        username,
        password,
        email,
        lastName,
        firstName
        } = req.body

    let user = await User.findOne({email})

    if (user) {
        return res.redirect('/register');
    }
 
    const hashedPass = await bcrypt.hash(password, 12);

    user = new User({
        username,
        password: hashedPass,
        email,
        lastName,
        firstName
    })
    await user.save();
    res.redirect('/')
});

    module.exports = router;