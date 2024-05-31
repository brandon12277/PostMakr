const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    firebaseUid : {
       type : String,
       required : [true]
    },
    name : {
        type: String,
        required  : [true]
    },
    post: {
        type: String,
        required : [true],
        unique  :true,
    },
   
});

const Post = mongoose.model('Post',postSchema)
module.exports = Post