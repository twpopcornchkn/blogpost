const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", function(req, res, next){
    Post.find({})
    .then(item => res.send(item))
    .catch(err => next(err));
})

router.post("/", function(req, res, next){
    Post.create(req.body)
    .then(post => res.status(201).send(post))
    .catch(err => next(err))
})


router.delete("/:id", function(req, res, next){
    Post.findByIdAndDelete(req.params.id)
    .then(post => res.status(201).send(post))
    .catch(err => next(err))
})


module.exports = router;
