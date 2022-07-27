let mongoose=require("mongoose");
let Schema= mongoose.Schema;

let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")

let userSchema= new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    cart: [{type : Schema.Types.ObjectId, ref:"Book"}]
})

userSchema.pre("save", async function(next){
if(this.password&& this.isModified("password")){
this.password= await bcrypt.hash(this.password,10)
return next()
}
})

userSchema.methods.verifyPassword= async function(password){
let result= await bcrypt.compare(password,this.password)
return result
}

userSchema.methods.verifyTokan= async function(){
    let payload={email:this.email,password:this.password}
    try {
        let tokan= await jwt.sign(payload,process.env.secret)
        return tokan   
    } catch (error) {
       return error 
    }

}

userSchema.methods.userJSON=function(tokan){
    return {
        name:this.name,
        email:this.email,
        Id:this.id,
        tokan:tokan
    }
}

module.exports=mongoose.model("User",userSchema)