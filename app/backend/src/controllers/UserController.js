const User = require("../model/UserModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/sendEmail");
const path = require("path");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({ error: "All Fields are mandatory" }); 
  }

  const availableUser = await User.findOne({ email });
  if (availableUser) {
    return res.status(409).send({ error: "User already registered" }); 
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("password : ", hashedPassword);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  console.log(user);

  if (user) {
    res
      .status(200)
      .json({
        __id: user.id,
        email: user.email,
        password: user.hashedPassword,
      });
    res.render("login");
  } else {
    res.status(400);
    throw new Error("User Data is not valid");
  }
});

const keyy = process.env.ACCESS_TOKEN_SECRET || "newsagr21";
// Login

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "All Fields are mandatory" });
  }

  const user = await User.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      keyy,
      { expiresIn: "30d" }
    );

    const oneday = 24 * 60 * 60 * 1000;
    res.cookie("jwt", accessToken, {
      expires: new Date(Date.now() + oneday),
      httpOnly: true,
    });

    return res.status(200).send({ message: "Successfully logged in" });
  } else {
    return res.status(401).send({ error: "Email or password is not valid" });
  }
};

function generateOTP() {
  const digits = "0123456789";
  let OTP = "";

  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  return OTP;
}
//ForgotPassword

const ForgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    if(!email){
      return res.status(400).send({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email });
    console.log(email);
    if (!user) {
      // If user doesn't exist, return an error response
      res.status(400).json({ message: "User not found", check: false });
    } else {
      res.json({ message: "User found", check: true });
    }
  } catch (error) {
    // Handle any errors that might occur during the process
    console.error(error);
    res.status(500).json({ message: "An error occurred", check: false });
  }
};

//Reset Password

const getResetPassword = async (req, res) => {
  const { user_email } = req.params;
  console.log(user_email);
  const user = await User.findOne({ email: user_email });
  console.log(user);

  if (!user) {
    res.status(401);
    throw new Error("Go and register First");
  } else {
    res.render("resetpassword.ejs");
  }
};
const ResetPassword = async (req, res) => {
  try {
    const email = req.query.email;

    // Check if the user with the given email exists
    const user = await User.findOne({ email: email });

    if (!user) {
      // If user doesn't exist, return an error response
      res.status(400).json({ message: "User not found" });
    } else {
      const sixDigitOTP = generateOTP();
      const subject = "Forgot Password";
      const body = "The OTP to reset your password is : " + sixDigitOTP;
      await sendEmail(user.email, subject, body);

      res.render("resetpassword", { email: user.email, OTP: sixDigitOTP });
    }
  } catch (error) {
    // Handle any errors that might occur during the process
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
const logout = async (req, res) => {
  try {
    console.log("Success.");
    res.clearCookie("jwt");
    // res.send({ message: "Logged out successfully" });
    res.redirect("/login");
  } catch (err) {
    res.status(401).send(err);
  }
};
const newpassword = async (req, res) => {
  const { newP, confP, email } = req.body;

  console.log(req.body);
  if (!newP || !confP) {
    res.status(401);
    throw new Error("All fields are Mandatory");
  }

  if (newP !== confP) {
    res.status(401);
    throw new Error("Both Fields should be same");
  }

  User.findOne({ email: email }).then(async (user) => {
    if (!user) {
      res.status(401);
      throw new Error("Go and register First");
    } else {
      try {
        user.password = await bcrypt.hash(newP, 10);
        await user.save();

        res.json({ message: "Updated Successfully" });
        console.log(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  });
};

module.exports = {
  registerUser,
  LoginUser,
  ForgotPassword,
  ResetPassword,
  getResetPassword,
  logout,
  newpassword,
};
