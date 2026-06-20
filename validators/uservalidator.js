const { param, check,body } = require('express-validator');
const validatormiddleware = require('../middlewares/validator');
const UserModel=require('../models/userModel')
const bcrypt=require('bcrypt')

exports.signupValidator=[
    check("username")
    .notEmpty().withMessage("name cannot be empty")
    .isLength({min:3}).withMessage("User name is too short")
    .isLength({max:20}).withMessage("User name is too long"),

    check("email")
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Enter a valid email'),
    
    
    check("password")
    .notEmpty().withMessage('password is required')
    .isLength({min:6}).withMessage('short password'),
    validatormiddleware,
    
];

exports.loginvalidator=[
     check("email")
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Enter a valid email'),
    
    
    check("password")
    .notEmpty().withMessage('password is required')
    .isLength({min:6}).withMessage('short password'),

    validatormiddleware
];