const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blogpost-backend", {
    useNewUrlParser: true
});

mongoose.set("debug", true);
mongoose.Promise = Promise;

const postSchema = new mongoose.Schema({
    post: String
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
