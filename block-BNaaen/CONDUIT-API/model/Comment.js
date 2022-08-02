let mongoose=require("mongoose");
let Schema= mongoose.Schema;

let commentSchema= new Schema({
    body:{type:String,required:true},
    author:{
        userName:{type:String,required:true},
        bio:{type:String,required:true},
        following:{type:Boolean},
        image:{type:String}
    }
})

module.exports=mongoose.model("Comment",commentSchema)