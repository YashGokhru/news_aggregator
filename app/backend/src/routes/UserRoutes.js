const express = require("express");
const router  = express.Router();
const {
        registerUser,
        LoginUser
       
        
    } = require("../controllers/UserController");

//For SignUp

router.post("/register",registerUser);

//For login
router.post("/login",LoginUser);







module.exports = router;