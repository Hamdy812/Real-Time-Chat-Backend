const User = require("../models/userModel");
const ApiErrors=require('../middlewares/ApiErrors')
const crypto=require('crypto')
const bcrypt=require('bcrypt')

const createToken=require('../utils/createToken')
const asyncHandler=require('express-async-handler')

//sign up
exports.signup=asyncHandler(async(req,res,next)=>{
    const user=await User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })
    const token=createToken(user._id)
    res.status(201).json({token:token})

})


//Login
exports.login=asyncHandler(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user||(await bcrypt.compare(req.body.password,user.password))){
        throw new ApiErrors("User Not defiend")
    }
        const token =createToken(user._id);
        res.status(200).json({token:token})


})