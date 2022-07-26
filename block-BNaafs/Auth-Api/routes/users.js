var express = require('express');
var router = express.Router();

let User=require("../model/User")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// register user
router.get("/form",(req,res,next)=>{
  res.render("form")
})

router.post('/register', async (req, res, next) => {
  try {
    let user = await User.create(req.body) 
    let token = await user.signToken()
    res.status(201).json({ user: user.userJSON(token) })
  } catch (error) {
    next(error)
  }
})

// login process

router.post("/login", async(req,res,next)=>{
  let {email,password}= req.body;
  if(!email && !password){
    return res.status(400).json({err: "email and password is worng"})
  }
  let user= await User.findOne({email});
  if(!user){
    return res.status(400).json({err: "email is worng"})
  }
  let result= await user.verifyPassword(password)
  if(!result){
    return res.status(400).json({err: "password is worng"}) 
  }
  let tokan= await user.singTokan()
  res.json({ user : user.user(tokan) })
})

module.exports = router;
