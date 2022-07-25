var express = require('express');
let  User = require('../model/User');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({right: "render user router"});
});

// user create 

router.post("/register", async(req,res,next)=>{
  try {
    let user = await User.create(req.body) 
    res.status(201).json(user)
  } catch (error) {
    next(error) 
  }
})

// loginprocess
router.post("/login",async(req,res,next)=>{
  let {email,password}=req.body;
  if(!email && !password){
    return res.status(400).json({email:"email and password is require"})
  }
  try {
    let user= await User.findOne({email});
    if(!user){
      return res.status(400).json({email:"email is wrong"})
    }
    let result= await user.verifyPassword(password)
    if(!result){
      return res.status(400).json({email:"password is wrong"}) 
    }
    console.log(user,result)
  } catch (error) {
    next(error)
  }

})

module.exports = router;
