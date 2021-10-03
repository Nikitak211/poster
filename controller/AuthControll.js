const User = require('../models/user')
const bcrypt = require('Bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if (err) {
            res.json({
                error:err
            })
        }
        let user = new User ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
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
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [
        {email:username},
        {firstName:username},
        {username:username},
        {lastName:username}
    ]})
    .then( user => {
        if ( user ) {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    res.json({
                       error: err 
                    })
                }
                if ( result ) {
                    let token = jwt.sign({name: user.name}, ')"ĩĐ(ĐõÛ}vß}ĩ', {expiresIn: '1h'})
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