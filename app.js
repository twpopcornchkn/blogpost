const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const errHandler = require("./handlers/error");
const postRoutes = require("./routes/post");
const PORT = 8080;

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/post", postRoutes);


//setup 404 error
app.use(function(req, res, next){
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
})

//error handler
app.use(errHandler);

//listen to port 
app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`);
})
