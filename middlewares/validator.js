const {body,validationResult,param}=require('express-validator')

const validatormiddleware=(req,res,next)=>{
    const errors=validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}

module.exports=validatormiddleware