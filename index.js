const express=require("express")
const dotenv = require("dotenv");
dotenv.config();
const connectDB=require('./db/db')
const PORT=process.env.PORT || 5000;
const app=express()
app.use(express.json());
connectDB();


app.listen(PORT,()=>{
    console.log(`app is listen on port : ${PORT}`)
})


