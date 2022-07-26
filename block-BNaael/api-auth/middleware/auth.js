let jwt=  require("jsonwebtoken");



module.exports={
verifyTokan: async (req,res,next)=>{
let tokan= req.headers.authorization;
try {
    if(tokan) {
    
        let payload=  await jwt.verify(tokan, process.env.secret)
        // console.log(payload)
        req.users=payload;
        return next()
       
    } else{
        res.json({error : "tokan required"})
    }  
} catch (error) {
    next( error);
} 
}
}


