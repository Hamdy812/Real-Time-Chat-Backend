const jwt=require('jsonwebtoken')

const createToken=(payload)=>{
    return jwt.sign({userId:payload},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_SECRET_TIME
    })
}

module.exports=createToken;