var express = require('express');
var router = express.Router();

// let auth= require("../middleware/auth");
// router.use(auth.verifyToken)
let User= require("../model/User");



// cfreate user
router.post("/", async(req,res,next)=>{
let user= await User.create(req.body);
let token= await user.verifyToken()
res.status(200).json({user  :  user.userJSON(token)})

})

// login process
router.post("/login", async (req,res,next)=>{
let {email,password}=req.body;
if(!email && !password){
  return res.status(400).json({Error:"email and password are required "})
}
let user= await User.findOne({email});
if(!user){
  return res.status(400).json({Error:"email is required "})
}
let result= await user.verifyPassword(password);
if(!result){
  return res.status(400).json({Error:"password is required "})  
}

let token= await user.verifyToken()
let userData= await user.userJSON(token);

res.status(200).json({user  :  userData})
})

// current user

router.get("/",  async(req,res,next)=>{
  let userId = req.users.userId;
  let user= await User.findById(userId);
  res.status(200).json(user)
})

// update user

router.put("/", async(req,res,next)=>{
  let userId= req.users.userId;
  let user= await User.findByIdAndUpdate(userId,req.body,{new:true});
  res.status(200).json(user)
})

module.exports = router;
