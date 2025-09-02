const mongoose = require("mongoose")
const userModel = require("./users")

const postSchema = mongoose.Schema({

   userId : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
   },
Message:String,
postedDate:{type:Date,default:Date.now}
    })

var postModel=mongoose.model("posts",postSchema)
module.exports=postModel