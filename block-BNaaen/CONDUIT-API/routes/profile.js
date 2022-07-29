let express = require('express');
const User = require('../model/User');
let router = express.Router();
let auth= require("../middleware/auth");

router.use(auth.verifyToken)

router.get('/:username', async (req, res, next) => {
  let username = req.params.username;
  let user = await User.find({ username });
  res.status(200).json(user);
});

router.post('/:username/follow', async (req, res, next) => {
  let loginUserId =req.users.userId;
  let username = req.params.username
  let user = await User.find({ userName:username });
let updateLoginUser= await User.findByIdAndUpdate(loginUserId,{$push:{followUser: user[0].id}},{new:true});
if(updateLoginUser.followUser.includes(user[0].id)){
  res.json({Follow : true})
}else{
  res.json({UnFollow:true})
}
});

// unfollow

router.delete("/:username/unfollow", async(req,res,next)=>{
let loginUserId= req.users.userId;
let username= req.params.username;
let user= await User.find({userName: username});
let loginuser= await User.findById(loginUserId);
if( !loginuser.unfollowUser.includes(user[0].id)){
res.json({UnFollow:true})
}else{
  res.json({Follow:true})
}
})


module.exports = router;
