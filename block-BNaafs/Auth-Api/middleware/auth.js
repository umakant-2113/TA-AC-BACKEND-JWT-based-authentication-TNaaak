let jwt = require('jsonwebtoken');

module.exports = {
  verifyTokan : async(req, res, next) => {

    let tokan = req.headers.authorization;
    try {
       if(tokan){
        let payload= await jwt.verify(tokan, process.env.secret);
        req.user=payload;
        next()
       } else{
        res.json({tokan:"required tokan"})
       }
    } catch (error) {
        res.json({error:"tokan is wrong"})
        next(error)
    }
   
  },
};
