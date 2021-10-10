const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const userdata = mongoose.model('User', userSchema);

module.exports = userdata;
