const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models

const userSchema = new Schema({
    firstName: {type: String },
    lastName: {type: String },
    username: {type: String },
    email: {type: String },
    password: {type: String }
});

const userdata = mongoose.model('User', userSchema );

module.exports = userdata;
