const User = require("../model/UserModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw Error("All Fields are mandotory");
    }
    const availableUser = await User.findOne({email});
    if(availableUser)
    {
        res.status(400);
        throw new Error("User already registered");
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password,10); 
    console.log("password : ",hashedPassword);

    const user = await User.create(
        {
            name,
            email,
            password : hashedPassword
        }
        )
        console.log(user);
        // res.json({message:"New user registered successfully"});
        if(user){
             res.status(200).json({__id: user.id,email:user.email,password:user.hashedPassword})
        }
        else{
            res.status(400);
            throw new Error("User Data is not valid");
        }
});


// Login 

const LoginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All Fields are mandotory")
    }
    const user = await User.findOne({email});
    if(user && await bcrypt.compare(password,user.password))
    {
        // res.json({message:"Login SuccesFully"});
        const accessToken = jwt .sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30d"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});




module.exports = {
    registerUser,
    LoginUser


}