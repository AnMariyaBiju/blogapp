const Express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const userModel = require("./models/users")
const postModel = require("./models/post")



let app= Express()


app.use(Express.json())
app.use(cors())

mongoose.connect("mongodb+srv://newuser:newuser@cluster0.moiyaer.mongodb.net/blogAppDb?retryWrites=true&w=majority&appName=Cluster0")
//create a post
app.post("/create", async (req, res) => {
    let input = req.body
    let token = req.headers.token

    jwt.verify(token, "blogapp", async (error, decoded) => {
        if (decoded && decoded.email) {
            let result = new postModel(input)
            await result.save()
            res.json({ "status": "success" })
        } else {
            res.json({ "status": "invalid authentication" })
        }
    })
})

//view all
app.post("/viewall",(req,res)=>{
   let token=req.headers.token
   jwt.verify(token,"blogapp",(error,decoded)=>
{
    if (decoded && decoded.email) {
     postModel.find().then(
        (items)=>{
            res.json(items)
        }
     ).catch((error)=>{
        res.json({"status":"error"})
     })   
    } else {
        res.json({ "status": "invalid authentication" })
    }
})
})
//view my




//sign in
app.post("/signin",async(req,res)=>{
    let input = req.body
    let result=userModel.find({email:req.body.email}).then(
        (items)=>{
            if(items.length>0)
            {
             const passwordvalidator=bcrypt.compareSync(req.body.password,items[0].password)
             if(passwordvalidator)
             {
              jwt.sign({email:req.body.email},"blogapp",{expiresIn:"2d"},(error,token)=>{

                if (error) {
                    res.json({"status":"error","errormessage":error})
                } else {
                    res.json({"status":"success","token":token,"userid":items[0]._id})
                }
              })
             }
             else
             {
                res.json({"status":"incorrect password"})
             }
            }else{
              res.json({"status":"invalid email id"})
            }
        }
    ).catch()
})








//sign up
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