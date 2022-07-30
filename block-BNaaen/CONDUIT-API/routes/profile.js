let express = require('express');
const User = require('../model/User');
let router = express.Router();
let auth= require("../middleware/auth");

router.use(auth.verifyToken)

router.get('/:username', async (req, res, next) => {
  let username = req.params.username;
  let usr = await User.find({ username });

  let profile = {
    name: usr.name,
    username: usr.username,
    email: usr.email,
    bio: usr.bio,
    following: usr.following
}
return res.json({ profile })
});

router.post('/:username/follow', async (req, res, next) => {
  let loginUserId =req.users.userId;
  console.log(req.users)
  let username = req.params.username
  let user = await User.findOne({ userName:username });
   let loginUser= await User.findById(loginUserId)
   if(loginUser.followUser.includes(user[0].id)){
    res.json({follow: "this user is already follow"})
   }
   if(!loginUser.followUser.includes(user[0].id)){
   let loginUser= await User.findByIdAndUpdate(loginUserId, {$push : {followUser: user[0].id}},{new:true});
   res.json({follow:true})
   }

 
});

// unfollow

router.delete('/:username/follow', async (req, res, next) => {
  let username = req.params.username
  let loggedInUser = req.users.userId

  try {
      let unfollowedUser = await User.findOne({ username })

      // //no followed user
      if (!unfollowedUser) {
          return res.status(400).json({ error: `${username} is not found` })
      }
      //checking loggedInUser and followed user are not same
      if (unfollowedUser._id.equals(loggedInUser)) {
          return res.status(400).json({ error: 'You Can`t unfollow Yourself' })
      }

      //checking if user is alredy followed or not
      if (unfollowedUser.follow.includes(loggedInUser)) {
          //finally unfollowed
          let usr = await User.findOneAndUpdate({ username }, { $pull: { follow: loggedInUser } }, { new: true })
          usr.following = false

          let profile = {
              name: usr.name,
              username: usr.username,
              email: usr.email,
              bio: usr.bio,
              following: usr.following
          }
          return res.json({ profile })
      }

      return res.json({ error: `You Have already unfollowed ${username}` })

  } catch (error) {
      next(error)
  }
})


module.exports = router;
