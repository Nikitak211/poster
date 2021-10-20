const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models

const postSchema = new Schema({
    author: {
        type: String,
        ref:"User"
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    avatar: {
        type: String,
        ref:"User"
    },
    date: {
        type: Date,
        ref: "User"
    }
});

const postdata = mongoose.model('Post', postSchema);

module.exports = postdata;
