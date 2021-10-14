//Third party packeges
const express = require('express');
const router = express.Router();
const bcrypt = require('Bcryptjs');
const jwt = require('jsonwebtoken');

//Local imports
const User = require('../models/user')

router.post('/register', async (req, res, next) => {
    try{
    const {
        username,
        password,
        email
    } = req.body

    let user = await User.findOne({ email })
    if (user) {
        return res.send({ registerError: "email allready exsisting" })
    }

    const hashedPass = await bcrypt.hash(password, 12);

    user = new User({
        username,
        password: hashedPass,
        email
    })

    await user.save()
        res.send({success: "user has created"})
    } catch (error) {
        res.send({error: "cannot complete registration"})
        console.error(error)
    }
});

router.post('/login', async (req, res) => {
    try{
    const {
        email,
        password 
    } = req.body


    await User.findOne({
        $or: [
            { email: email }
        ]
    })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                            return res.send({
                                loginError: 'password of email doesnt exsist'
                            })
                    }

                    if (result) {
                        
                        const token = jwt.sign({ name: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' })
                        req.session.authorization = token
                        return res.send({
                            status: true,
                            isAuth: 'Login successfully',
                             token
                        })
                        
                    }
                })
            } 
        })
} catch {
    res.send({
        login: 'password of email doesnt exsist'
    })
}});

router.post('/logout', (req, res) => {
    if(logout){
    req.session.destroy((err) => {
        res.send( {drop: 'logout succsess'})
        if (err) throw err;
    })
    }
})

module.exports = router;