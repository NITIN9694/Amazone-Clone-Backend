const { default: mongoose } = require("mongoose");
const mogoose  = require("mongoose");
 
const userScheme = mogoose.Schema({
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



const User = mongoose.model("User",userScheme);