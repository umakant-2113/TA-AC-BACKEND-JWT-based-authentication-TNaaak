let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")

require('dotenv').config()

let userSchema= new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,minlength:5}
})

userSchema.pre("save", async function(next){
    try {
        if(this.password&& this.isModified("password")){
            this.password= await bcrypt.hash(this.password,10)
        } 
        next()
    } catch (error) {
        return error;
    }
})

userSchema.methods.verifyPassword= async function(password){
    try {
        let result=await bcrypt.compare(password,this.password) 
        return result 
    } catch (error) {
        return error
    }
}

userSchema.methods.verifytokan= async function(){
    let payload= {email:this.email, userId:this.id};

    try {
        let token= await jwt.sign(payload,process.env.secret);
        
        return token  
    } catch (error) {
        return error
    }
}

userSchema.methods.userJSON=  function(tokan){
return {
    name:this.name,
    email:this.email,
    tokan:tokan
}

}

module.exports=mongoose.model("User",userSchema)