const express = require("express");
const {registerUser} = require("../controllers/UserController");

const router  = express.Router();

//For SignUp

router.post("/",registerUser);




module.exports = router;