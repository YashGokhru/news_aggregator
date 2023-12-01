const express = require("express");
const router = express.Router();
const {
    registerUser,
    LoginUser,
    ForgotPassword,
    ResetPassword,
    getResetPassword,
    logout,
    newpassword

} = require("../controllers/UserController");
const validateToken = require("../middleware/validateToken");

//For SignUp

router.post("/register", registerUser);

//For login
router.post("/login", LoginUser);

//Forgot Passowrd
router.post("/forgotpassword/", ForgotPassword);
router.post("/newpassword/", newpassword);
//Reset Password

router.get("/resetpassword/send-email", ResetPassword);
router.get("/logout", logout);

//GetReset Password

// router.get("/resetpassword/:user_email", getResetPassword);

module.exports = router;