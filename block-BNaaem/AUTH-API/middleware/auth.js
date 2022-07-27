let jwt = require('jsonwebtoken');

module.exports = {
  connectTokan: async (req, res, next) => {
    let tokan = req.headers.authorization;
    // console.log(tokan)
    try {
      if (tokan) {
        let payload = await jwt.verify(tokan, process.env.secret);
        // console.log(payload)
        req.users=payload;
        next()
      }else{
        res.status(400).json({error:"tokan is required"})
      }
   
    } catch (error) {
        next(error)
    }
  },
};
