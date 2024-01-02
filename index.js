const express = require("express");
const mogoose = require("mongoose");
const app = express();


/*import routes */
const authRouter = require("./routes/auth_router");

app.use(express.json());
app.use(authRouter);



//connection 
mogoose.connect("mongodb+srv://nitin:969421@fluttercluster.mptpvvn.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("connect SucessFully");
}).catch((e)=>{
    console.log(e);
})

app.listen(2000,"0.0.0.0",()=>{
console.log("http://localhost:2000");
});
