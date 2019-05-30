const jwt = require("jsonwebtoken");

//user authentication 
//cant' use async funciton, MWT module still use a callback pattern
exports.loginRequired = function(req, res, next){
    try{
        //Bearer aslfjalfljafslsj --> we want this, so we use split and index 1
        const token = req.headers.authorization.split(" ")[1];

        //decode token 
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){
                return next();
            }else{
                return next({
                    status:401,
                    message: "Please log in first"
                })
            }
        })
    }
    catch(e){
        return next({
            status:401,
            message: "Please log in first!"
        });
    }

}

exports.userAuthorization = function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];

        //docode tokn 
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded && decoded.id === req.params.id){
                return next();
            }else{
                return next({
                    status:401, 
                    message: "Unauthorized"
                })
            }
        })
    }
    catch(e){
        return next({
            status:401, 
            message: "Unauthorized"
        })
    }

}
