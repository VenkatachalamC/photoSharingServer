
const mongoose=require("mongoose");

const likesSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    postid:{
        type:String,
        required:true
    }
})

const likesModel=mongoose.model("like",likesSchema);

module.exports=likesModel;