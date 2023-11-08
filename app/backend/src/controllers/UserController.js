const User = require("../model/UserModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/sendEmail");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All Fields are mandotory");
    }
    const availableUser = await User.findOne({ email });
    if (availableUser) {
        res.status(400);
        throw new Error("User already registered");
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("password : ", hashedPassword);

    const user = await User.create(
        {
            name,
            email,
            password: hashedPassword
        }
    )
    console.log(user);
    // res.json({message:"New user registered successfully"});
    if (user) {
        res.status(200).json({ __id: user.id, email: user.email, password: user.hashedPassword })
    }
    else {
        res.status(400);
        throw new Error("User Data is not valid");
    }
});


// Login 

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields are mandotory")
    }
    const user = await User.findOne({ email:email });
    if (user && await bcrypt.compare(password, user.password)) {
        // res.json({message:"Login SuccesFully"});
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30d" }
        );
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});

//ForgotPassword 

const ForgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email: email });
    const user_email = user.email;
    console.log(user_email)
    if (!user_email) {
        res.status(400);
        throw new Error("Enter Valid Email");
             
    }
    else {
        try{
            const subject = "Forgot Password";
        const link = `http://localhost:${process.env.PORT}/user/resetpassword/${user_email}`;
        const body = link;
        await sendEmail(user_email, subject, body);
        res.json({ message: "Sent Succesfully" });  
        }  
        catch (error){
            res.json({message:error});
        }     
        
        
    }
}


// .catch((err)=>{
//     res.status(400);
//     throw new Error(err);
//)}

const getResetPassword = async(req,res) => {
    const { user_email } = req.params;
    console.log(user_email);
    const user = await User.findOne({ email:user_email });
    console.log(user);
    
    if (!user) {
        res.status(401);
        throw new Error("Go and register First");
    }

    else {
        res.render("resetpassword.ejs");
    }
    
}
const ResetPassword = async (req, res) => {
    const { newP, confP } = req.body;
    const { user_email } = req.params;
    console.log(req.body);
    if (!newP || !confP) {
        res.status(401);
        throw new Error("All fields are Mandatory");

    }

    if (newP !== confP) {
        res.status(401);
        throw new Error("Both Fields should be same");

    }

    User.findOne({ email: user_email })
    .then(async (user) => {
      if (!user) {
        res.status(401);
        throw new Error("Go and register First");
      } else {
        
        try {
          user.name = "SmeetAgrawal";
          user.password = await bcrypt.hash(newP, 10); 
  
          await user.save(); 
  
          res.json({ message: "Updated Successfully" });
          console.log(user);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    })
    
    

}



module.exports = {
    registerUser,
    LoginUser,
    ForgotPassword,
    ResetPassword,
    getResetPassword


}