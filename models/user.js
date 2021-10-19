const mongoose = require('mongoose');
const Schema = mongoose.Schema

//Schema creater and models

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: [true, "cannot use this email"],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts:[{
        type: String,
        ref: "Post"
    }]
});

const userdata = mongoose.model('user', userSchema);

module.exports = userdata;
