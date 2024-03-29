const mongoose = require("mongoose");
 
const userScheme = new mongoose.Schema({
    name:{
        required:true,
        trim:true,
        type:String,

    },
    email:{
        required:true,
        trim:true,
        type:String,
        validate:{
            validator:(value)=>{
                const re =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message:"Please enter a valid email address", 
        }

    },
    password:{
        required:true,
        trim:true,
        type:String,

    },
    address:{
       type:String,
       default:"" 
    },

    type:{
        type:String,
        default:"user" 
    }

})


module.exports = mongoose.model("User",userScheme);
