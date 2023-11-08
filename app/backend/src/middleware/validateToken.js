const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async (req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(!authHeader){
        res.status(400)
        throw new Error("Missing header");
    }
    console.log(authHeader);

    if(!authHeader.startsWith("Bearer")){
        res.status(400);
        throw new Error("Header is not starting with Bearer");
    }


    token = authHeader.split(" ")[1];
    if(!token){
        res.status(400);
        throw new Error("token not extracted")
    }
    console.log(token);
    jwt.verify(token,process.env.JWT_SECRET_TOKEN,(err,decoded)=>{
        if(err){
            res.status(401);
            throw new Error("User unauthorized");
        }
        req.user = decoded.user;
        console.log(req.user);
        next();
    })

    
    
})




module.exports = validateToken;