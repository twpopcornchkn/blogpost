const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/blogpost-backend", {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

module.exports.User = require("./user");
module.exports.Post = require("./post");
