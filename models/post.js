const mongoose = require("mongoose");
const User = require("./user");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String, 
            required: true,
            maxlength: 160
        },
        post: {
            type: String, 
            required: true,
            maxlength: 800
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
   
    },{
        timestamps: true
    }
);

//add pre remove hook to clean up post id on the user model 
postSchema.pre('remove', async function(next){
    try{
        let user = await User.findById(this.user);
        user.post.remove(this.id)
        await user.save();
        return next();
    }
    catch(e){
        return next(e);
    }

})

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
