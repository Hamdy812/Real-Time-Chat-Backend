const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const userSchema=mongoose.Schema({
  
    username:{
        type:String,
        required: [true,"username is required"],
        unique: [true,'email must defiend once']
    },
    email:{
        type:String,
        required: [true,"email is required"],
        unique: [true,'email must defiend once']
    },
    password:{
        type:String,
        required: [true,"password is required"],
        minlength:[8,"minimum length is 8 characters"]
    },
},{ timestamps: true }
)

userSchema.pre('save',async ()=>{
    const salt=bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
      next();

});

const usermodel=mongoose.model("User",userschmea)
module.exports=usermodel;