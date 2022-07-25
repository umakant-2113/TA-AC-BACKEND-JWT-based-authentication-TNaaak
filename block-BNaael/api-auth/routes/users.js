var express = require('express');
var router = express.Router();

let User=require("../model/User")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({right:"user page render" })
});

router.post("/register",async(req,res,next)=>{
  try{
let user=await User.create(req.body)
res.json(user)
  }catch(err){
return err;
  }
})

router.post("/login", async(req,res,next)=>{
  try {
    let {email,password}=req.body;
if(!email && !password){
  return res.status(400).json({err:"email/password is required"})
}
let user= await User.findOne({email});
if(!user){
  return res.status(400).json({err:"email is wrong"})
}
let result= await user.verifyPassword(password)
return res.status(400).json({err:"logi process success fully"})
  } catch (error) { 
  }
})

module.exports = router;
