const express=require("express")
const multer=require("multer")
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const userModel=require("./models/userModel")
const postModel=require("./models/postModel")

const app=express();
const storage=multer.memoryStorage();
const upload=multer({
    storage:storage
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://venkat:venkat123@cluster0.mil8ysu.mongodb.net/photosharing").then((_)=>{
    app.listen(6000,()=>console.log("server started"))
}) 

app.post("/login",(req,res)=>{
    userModel.findOne({userName:req.body.userName})
    .then(result=>{
        if(result && result.password===req.body.password){
            res.send({status:"ok"})
        }
        else{
            res.status(401)
            res.send({status:"invalid"})
        }
    })
})

app.post("/signup",(req,res)=>{
    const user=new userModel({
        userName:req.body.userName,
        password:req.body.password
    })
    user.save().then(result=>{
        res.send({status:"ok"})
    }).catch(err=>res.send({status:"invalid"}))
})



app.post("/addpost",upload.single("post"),(req,res)=>{
    const post=new postModel({
        userName:req.body.userName, 
        post:{ 
            data:req.file.buffer,
            contentType:req.file.mimetype
        },
        caption:req.body.caption,
    })
    post.save().then((result)=>res.send({status:"ok"}))
})



app.get("/posts",(req,res)=>{
    postModel.find({},{post:0}).then(result=>{
        res.send(result)
    })
})



app.post("/likepost",(req,res)=>{
    postModel.updateOne({
        _id:req.body.id
    },{$inc:{likes:1}}).then(result=>res.send({status:"ok"}));
})



app.post("/dislike",(req,res)=>{
    postModel.updateOne({
        _id:req.body.id
    },{$inc:{likes:-1}}).then((result)=>{
        res.status(200)
        res.send({status:"ok"})
    }
        )
})


app.get("/post/:id",(req,res)=>{
    postModel.find({
        _id:req.params.id
    }).then(result=>{
        res.set("Content-Type",result[0].post.contentType)
        res.send(result[0].post.data)
    })
})