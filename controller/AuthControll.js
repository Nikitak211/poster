//Third parte packages
const bcrypt = require('Bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();


const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        user.save()
            .then(user => {
                res.json({
                    message: "User Added to database Successfully"
                })
            })
    })
}

const login = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    User.findOne({
        $or: [
            { email: username },
            { username: username },
        ]
    })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' })
                        res.json({
                            message: 'Login successfully',
                            token
                        })
                    } else {
                        res.json({
                            message: 'password doesnt match'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'no user found!'
                })
            }
        })
}

module.exports = {
    register,
    login
}