const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        required: true},
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true }
});

const userdata = mongoose.model('User', userSchema );

module.exports = userdata;
