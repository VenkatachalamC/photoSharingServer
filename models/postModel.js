
const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    post:{
        data:Buffer,
        contentType:String
    },
    caption:{
        type:String,
    },
    likes:{
        type:Number,
        default:0
    }
})

const postModel=mongoose.model("post",postSchema)
module.exports=postModel