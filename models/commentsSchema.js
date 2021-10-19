const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comments: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
})

const comments = mongoose.model('comments', commentsSchema)

module.exports = comments;