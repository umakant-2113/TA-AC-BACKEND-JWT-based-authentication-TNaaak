var express = require('express');
const User = require('../models/User');
var router = express.Router();

/* GET users listing. */


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/register", async(req,res,next)=>{
let user= await User.create(req.body);
let tokan = await user.verifyTokan()
res.status(200).json({user: user.userJSON(tokan)})
});

router.post("/login", async (req,res,next)=>{
let {email,password}= req.body;

if( !email && !password){
return res.status(400).json({Error:"email and password is required"})
}
let user = await User.findOne({email})
if(!user){
  return res.status(400).json({Error:"email is required"}) 
}
let result = await user.verifyPassword(password)
if(!result){
  return res.status(400).json({Error:"password is required"})  
}

let tokan = await user.verifyTokan()
res.status(200).json({user: user.userJSON(tokan)})

})

// how many book add his cart 
router.get("/:id", async (req,res,next)=>{
  let user= await User.findById(req.params.id).populate("cart");
  res.json(user)
  })

  router.get("/:id/remove",  async(req,res,next)=>{
    let id= req.params.id;
  let user1= await User.findById(id)
  console.log(user1)
  let user =await User.findByIdAndUpdate(id,{$pull : {cart :user1.cart[0]}})
  res.json(user)
  })

module.exports = router;
