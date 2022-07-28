let express=require("express");
const User = require("../model/User");
let router=express.Router()

router.get("/:username", async (req,res,next)=>{
let username=req.params.username;
let user= await User.find({username});
res.status(200).json(user)
})

router.get("/:username/follow", async(req,res,next)=>{
    let username=req.params.username;
    let user= await User.find({username});
    res.json(user)
})

module.exports=router