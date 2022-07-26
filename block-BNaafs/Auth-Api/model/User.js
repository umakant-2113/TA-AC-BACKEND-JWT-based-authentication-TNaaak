let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
require('dotenv').config()

let userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

userSchema.pre("save", async function(next){
    if(this.password&& this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10)
        return next()
    }
})

userSchema.methods.verifyPassword= async function(password){
let result=await bcrypt.compare(password,this.password);
return result
}

userSchema.methods.signToken = async function(){
    let payload={userId:this.id,email:this.email};
    try {
        let token = await jwt.sign(payload,process.env.secret);
        return token;
    } catch (error) {
        return error
    }
}

userSchema.methods.userJSON= async function(tokan){
    return  {
        name:this.name,
        email:this.email,
        tokan:tokan
    }
    
}

module.exports=mongoose.model("User",userSchema)