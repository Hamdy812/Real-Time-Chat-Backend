const express = require("express");
const router = express.Router();
const {signupValidator,loginvalidator}=require('../validators/uservalidator')
const {signup,login}=require("../controller/userController")

router.route("/signup").post(signupValidator,signup)
router.route("/login").post(loginvalidator,login)


module.exports = router;