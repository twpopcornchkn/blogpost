const mongoose = require("mongoose");
const Post = require("./post");

const commentSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true, 
            maxlength:100
        },
        comment:{
            type: String, 
            required: true, 
            maxlength:500
        },
        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
    }, {
        timestamps: true
    }
)

//add pre remove hook to clean up comment id in the post model
commentSchema.pre("remove", async function(next){
    try{
        let post = await Post.findById(this.post);
        post.comments.remove(this.id);
        await post.save();
        return next();
    }
    catch(e){
        return next(e);
    }

})

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;