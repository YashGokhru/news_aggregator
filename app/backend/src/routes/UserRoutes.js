const express = require("express");
const router = express.Router();
const {
    registerUser,
    LoginUser,
    ForgotPassword,
    ResetPassword,
    getResetPassword


} = require("../controllers/UserController");
const validateToken = require("../middleware/validateToken");

//For SignUp

router.post("/register", registerUser);

//For login
router.post("/login", LoginUser);

//Forgot Passowrd
router.post("/forgotpassword", ForgotPassword);

//Reset Password

router.post("/resetpassword", ResetPassword);

//GetReset Password

// router.get("/resetpassword/:user_email", getResetPassword);

module.exports = router;