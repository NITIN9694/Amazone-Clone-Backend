const express = require("express");
const User = require("../models/user_model");

const authRouter =  express.Router();



authRouter.post("/api/singup",async(req,res)=>{
try{
    const{name,email,password} = req.body;
    const existingUser =await User.findOne({ email });
    
    if(existingUser){
        return res.status(400).json({
            msg:"User with this email already is already exist"
        });
    }
    
    let user =new User({
        email,
        password,
        name
    });
     
    user= await user.save();
     res.json();

}catch(e){
console.log(e);
 res.status(500);
}
  
});


module.exports = authRouter;