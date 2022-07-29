let mongoose=require("mongoose");
let Schema= mongoose.Schema;

let slug= require("slug")

let articleSchema= new Schema({
    slug:{type:String},
    title:{type:String,required:true},
    description:{type:String,required:true},
    body:{type:String},
    tagList:[{type:String}],
    favorited:{type:Boolean,default:false},
    favoriteArticle:[{type:Schema.Types.ObjectId,ref: "User"}],
    favoritiesCount:{type:Number,default:20},
    author:{
        userName:{type:String,required:true},
        bio:{type:String},
        image:{type:String},
        following:{type:Boolean}
    },
    commentId:[{type:Schema.Types.ObjectId,ref: "Comment"}]
})



module.exports= mongoose.model("Article",articleSchema)