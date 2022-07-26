var express = require('express');
var router = express.Router();

let User=require("../model/User")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({right:"user page render" })
});

router.post("/register",async(req,res,next)=>{

let user=await User.create(req.body)
let tokan= await user.verifytokan()
// console.log(user.userJSON(tokan))
 res.status(200).json({user:user.userJSON(tokan)})

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
if(!result){
  return res.status(400).json({err:"password is wrong"})
}

let tokan= await user.verifytokan()

return res.status(400).json({user:user.userJSON(tokan)})

  } catch (error) { 
    next(error)
  }
})

module.exports = router;
