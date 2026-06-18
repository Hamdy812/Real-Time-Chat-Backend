const mongoose = require("mongoose");

const messageSchema=mongoose.Schema({
  
    sender:{
        type:mongoose.Schema.type.ObjectId,
        ref:"User"
    },
    precevier:{
       type:mongoose.Schema.type.ObjectId,
        ref:"User"
    },
    messagecontent:{
        type:String,
        required: [true,"password is required"],
    },
},{ timestamps: true }
)

module.exports = mongoose.model("message", messageSchema);