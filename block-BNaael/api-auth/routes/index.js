var express = require('express');
var router = express.Router();
let auth=require("../middleware/auth")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(auth.verifyTokan)

router.get("/protect", (req,res,next)=>{
  console.log("hello world ")
res.json({access :"don not access"})
})

router.get("/hello",(req,res,next)=>{
  res.json("hello wolrd")
})

module.exports = router;
