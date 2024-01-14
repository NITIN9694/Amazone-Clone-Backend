const express = require("express");
const User = require("../models/user_model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");


const authRouter =  express.Router();



authRouter.post("/api/singup",async(req,res)=>{
try{
    const{name,email,password,address} = req.body;
    const existingUser  =await User.findOne({email});
    
    if(existingUser){
        return res.status(400).json({
            msg:"User with this email already is already exist"
        });
    }
    const bcryptPassword = await bcryptjs.hash(password,8)
    
    let user = new User({
        email,
        password:bcryptPassword,
        name,
        address
    });
     
    user= await user.save();
    const token = await jwt.sign({id:user._id},"passowrdKey");
    res.status(200).json({token,...user._doc});


}catch(e){
console.log(e);
 res.status(500).json(e);

}});


authRouter.post("/api/login",async(req,res)=>{
    try{
      const {email,password}=req.body;
      const user = await User.findOne({email});
      
      if(!user){
        return res.status(400).json({msg:"user this email is does not exist!"});
      }
      var isMatch =await bcryptjs.compare(password,user.password);
      
      if(!isMatch){
        return res.status(400).json({msg:"incorrect password"});
     }
     const token = await jwt.sign({id:user._id},"passowrdKey");
     res.status(200).json({token,...user._doc});

    }catch(e){
        res.status(500).json(e);
    }
})

authRouter.post("/tokenIsValid",async(req,res)=>{
    try{
        const token = req.header("x-auth-token");
        if(!token)return res.json(false);
        const verifed =jwt.verify(token,process.env.JWT_Token);  
    }catch(e){
        res.status(500).json({msg:e});
    }
})

authRouter.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
      const verified = jwt.verify(token, process.env.JWT_Token);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
      res.json(true);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  

authRouter.get("/api/getProfile",auth,async(req,res)=>{
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });

})




module.exports = authRouter;