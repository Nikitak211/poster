const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models

const postSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    }
});

const postdata = mongoose.model('Post', postSchema);

module.exports = postdata;
