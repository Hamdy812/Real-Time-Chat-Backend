const mongoose = require("mongoose");

const messageSchema=mongoose.Schema({
  
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    receiver:{
       type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    messageContent:{
        type:String,
        required: [true,"message content is required"],
    },
},{ timestamps: true }
)

module.exports = mongoose.model("message", messageSchema);