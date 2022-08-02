var express = require('express');
var router = express.Router();
let auth= require("../middleware/auth")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// protect router

router.get("/protect" ,auth.verifyToken, (req,res,next)=>{
res.json({access:" access is not " })
})


module.exports = router;
