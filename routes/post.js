const express = require("express");
const router = express.Router({mergeParams: true}); 

const {
    createPost, 
    getPosts, 
    deletePost
} = require("../handlers/posts");



//prefix = /api/users/:id/messages
router.route("/").post(createPost);


// router.get("/", function(req, res, next){
//     Post.find({})
//     .then(item => res.send(item))
//     .catch(err => next(err));
// })

// router.post("/", function(req, res, next){
//     Post.create(req.body)
//     .then(post => res.status(201).send(post))
//     .catch(err => next(err))
// })


// router.delete("/:id", function(req, res, next){
//     Post.findByIdAndDelete(req.params.id)
//     .then(post => res.status(201).send(post))
//     .catch(err => next(err))
// })


module.exports = router;
