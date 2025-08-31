const Express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const cors = require("cors")
const jsonwebtoken = require("jsonwebtoken")
const userModel = require("./models/users")



let app= Express()


app.use(Express.json())
app.use(cors())

mongoose.connect("mongodb+srv://newuser:newuser@cluster0.moiyaer.mongodb.net/blogAppDb?retryWrites=true&w=majority&appName=Cluster0")

app.post("/signup",async(req,res)=>{

    let input=req.body
    let hashedpassword = bcrypt.hashSync(req.body.password,10)
    console.log(hashedpassword)
    req.body.password=hashedpassword
   

userModel.find({email:req.body.email}).then(
(items)=>{
    if (items.length>0) {

    res.json({"status":"email id already exist"})


}else{


    let result = new userModel(input)

     result.save()
    res.json({"status":"success"})

}

}
).catch(

)


})

app.listen(3030,()=>{
    console.log("server started")
})