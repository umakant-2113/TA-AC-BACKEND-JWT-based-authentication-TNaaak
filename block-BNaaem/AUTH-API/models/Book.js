let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let bookSchema= new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    author:{type:String},
    pages:{type:Number},
    tags:[{type:String}],
    category:[{type:String}],
    price:{type:Number},
    quantity:{type:Number},
    commentId:[{type:Schema.Types.ObjectId,ref :"Comment"}],
    userId:{type:Schema.Types.ObjectId,  ref: "User"}
})

module.exports=mongoose.model("Book",bookSchema)