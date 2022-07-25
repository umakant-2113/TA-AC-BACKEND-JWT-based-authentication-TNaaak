let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let bcrypt=require("bcrypt")

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

module.exports=mongoose.model("User",userSchema)