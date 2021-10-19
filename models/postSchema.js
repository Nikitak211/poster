const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models

const postSchema = new Schema({
    title: String,
    content: String,
    comments:[{
        type: Schema.Types.ObjectId,
        ref: "comments"
    }]
});

const postdata = mongoose.model('Post', postSchema);

module.exports = postdata;
