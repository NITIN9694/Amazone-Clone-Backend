const jwt =require("jsonwebtoken");
const User = require("../models/user_model");
const { use } = require("../routes/auth_router");

const admin = async (req,res,next)=>{
    try{
     const token = req.header("x-auth-token");
     if(!token)
        return res.status(401).json({ msg: "No auth token, access denied" });

        const verified = jwt.verify(token, "passowrdKey");
        if (!verified)
          return res
            .status(401)
            .json({ msg: "Token verification failed, authorization denied." });
    
         const user = await User.findById(verified.id);
         if(user.type=="user"|| user.type=="seller"){
            return res.status(401).json({msg:"You are not admin"})
         }   
         
        req.user = verified.id;
        req.token = token;
        next();
     
    }catch(e){
        res.status(500).json({error:e})
    }
}
module.exports = admin;