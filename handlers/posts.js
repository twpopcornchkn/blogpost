const db = require("../models");

// POST /api/users/:id/messages/
exports.createPost  = async function(req, res, next){
    try{
        //create post 
        let post = await db.Post.create({
            title: req.body.title, 
            post: req.body.post,
            user: req.params.id
        })
        //insert post id in user 
        let foundUser = await db.User.findById(req.params.id);
        foundUser.post.push(post.id);
        await foundUser.save();

        //add and populate user property with username & image, so we can return all at once
        let foundPost = await db.Post.findById(post._id).populate("user", {
            username: true,
            profileImageUrl: true
        })
        return res.status(200).json(foundPost);

    }
    catch(e){
        return next(e);
    }
}
// GET /api/users/:id/posts/:post_id
exports.getPost = async function(req, res, next){
    try{
        let post = await db.Post.findById(req.params.post_id);
        return res.status(200).json(post);
    }catch(e){
        return next(e);
    }

}

// DELETE /api/users/:id/posts/:post_id
exports.deletePost = async function(req, res, next){
    try{
        let foundPost = await db.Post.findById(req.params.post_id);
        await foundPost.remove();
        return res.status(200).json(foundPost)
    }catch(e){
        return next(e);
    }
}

