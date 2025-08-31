const Express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const cors = require("cors")
const jsonwebtoken = require("jsonwebtoken")



let app= Express()
app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(3030,()=>{
    console.log("server started")
})