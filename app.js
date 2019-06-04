require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const errHandler = require("./handlers/error");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/comment");
const { loginRequired, userAuthorization } = require("./middleware/auth");
const PORT = 8080;
const db = require("./models");

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users/:id/posts", 
    loginRequired, 
    userAuthorization,
    postRoutes);

app.use("/api/post/:post_id/comment", commentRoutes);

//get allposts route
app.get("/api/allposts", loginRequired, async function(req, res, next){
    try{
        let allposts = await db.Post.find()
        .sort({ createdAt: "desc" })
        .populate("user", {
          username: true,
          email: true,
          profileImageUrl: true
        });
        return res.status(200).json(allposts);
    }
    catch(e){
        return next(e);
    }
})


//setup 404 error
app.use(function(req, res, next){
    let err = new Error("Page Not Found");
    err.status = 404;
    next(err);
})

//error handler
app.use(errHandler);

//listen to port 
app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`);
})
