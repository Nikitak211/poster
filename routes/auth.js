//Third party packeges
const express = require('express');
const router = express.Router();
const bcrypt = require('Bcryptjs');
const jwt = require('jsonwebtoken');

//Local imports
const User = require('../models/user')

router.post('/register', async (req, res) => {
    try{
    const {
        username,
        password,
        email
    } = req.body

    let user = await User.findOne({ email })
    if (user) {
        return res.send({ 
            error: true,
            message: "email allready exsisting" 
        })
    }

    const hashedPass = await bcrypt.hash(password, 12);

    user = new User({
        username,
        password: hashedPass,
        email
    })

    await user.save()
        res.send({
            success: true,
            message: "user has created"
        })
    } catch (error) {
        res.send({
            error: true,
            message: "cannot complete registration"
        })
        console.error(error)
    }
});

router.post('/login', async (req, res) => {
    const {
        email,
        password,
    } = req.body

    User.findOne({ email })
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.send({
                        error: true,
                        message: 'somthing went wrong'
                    })
                    }
                if (result) {

                    const token = jwt.sign({ name: User.username }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    req.session.authorization = token
                    return res.send({
                        success: true,
                        isAuth: 'Login successfully',
                        data: token
                    })
                } else {
                    return res.send({
                        error:true, 
                        message: 'email/password is incorrect'
                    });
                }
            })
        } else {
            res.send({ 
                error: true, 
                message: "email/password is incorrect"
            })
        }
    }).catch( (error) => {
        console.error(error)
    })
});

router.post('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (!error) {
            res.send({
                success: true,
                message: "Logged out."
            })
        }   
        if (error) {
            res.send({
                error: true,
                message:'an error has been encountered'
            })
        };
    })
})

module.exports = router;