const express = require("express");
const mogoose = require("mongoose");
const app = express();
require('dotenv').config();


/*import routes */
const authRouter = require("./routes/auth_router");
const adminRouter = require("./routes/admin_router");
const proudctRouter = require("./routes/porducts");


app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(proudctRouter);


//connection 
mogoose.connect(process.env.mogogdb_url).then(()=>{
    console.log("connect SucessFully");
}).catch((e)=>{
    console.log(e);
})

app.listen(2000,"0.0.0.0",()=>{
console.log("http://localhost:2000");
});
