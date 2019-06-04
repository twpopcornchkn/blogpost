const db = require("../models");

//POST /api//post/:post_id/comment
exports.createComment = async function(req, res, next){
    try{
        //create comment 
        let comment = await db.Comment.create({
            title: req.body.title, 
            comment: req.body.comment
        })

        //insert comment id in post 
        let foundPost = await db.Post.findById(req.params.post_id);
        foundPost.comments.push(comment.id);
        await foundPost.save();

        //populate user info and return in json 
        let newComment = await db.Comment.findById(comment._id).populate("user", {
            username: true, 
            profileImageUrl: true
        })
        return res.status(200).json(newComment);
    }
    catch(e){
        return next(e);
    }


}


exports.getComments = async function(req, res, next){
    try{
        let foundPostWithComments = await db.Post.findById(req.params.post_id)
        .sort({createdAt: "desc"})
        .populate("comments")
        
        return res.status(200).json(foundPostWithComments);
    }
    catch(e){
        return next(e);
    }


}