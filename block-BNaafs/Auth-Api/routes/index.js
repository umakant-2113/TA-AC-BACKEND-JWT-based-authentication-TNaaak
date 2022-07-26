var express = require('express');
var router = express.Router();

let auth=require("../middleware/auth")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/protected",auth.verifyTokan,(req,res,next)=>{
  res.json({access: "find accsse"})
})

module.exports = router;
