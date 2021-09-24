const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models

const userdataschema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: Number
});

const userdata = mongoose.model('poster', userdataschema );

module.exports = userdata;
