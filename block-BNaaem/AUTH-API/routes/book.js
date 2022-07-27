let express=require("express");
let router=express.Router();

let User=require("../models/User")
let Book= require("../models/Book")
let Comment=require("../models/Comments")
let auth=require("../middleware/auth")

router.use(auth.connectTokan)
// // list of all books
router.get("/", async (req,res,next)=>{
let books= await Book.find({})
res.json(books)
})


// create book 

router.post("/:id", async (req,res,next)=>{
    let id=req.params.id;
    req.body.tags=req.body.tags.split(" ");
    req.body.category= req.body.category.split(" ")
      let user= await User.findById(id)
      req.body.userId= user.id;
      let book=await Book.create(req.body);
      res.json(book)
})

// create comments on the book

router.post("/:id/comment", async(req,res,next)=>{
    let id=req.params.id;
let comment= await Comment.create(req.body)
let book= await Book.findByIdAndUpdate(id,{$push : {commentId: comment.id}},{new:true})
res.json(book)
})

// display comments in a book;

router.get("/:id", async(req,res,next)=>{
    let id= req.params.id;
    let book= await Book.findById(id).populate("commentId")
    res.json(book)
})

// user can update his book 
router.put("/:id", async (req,res,next)=>{
let id= req.params.id;
let user= req.users;
let book= await Book.findById(id).populate("userId")
if(user.email==book.userId.email){
    let book= await Book.findByIdAndUpdate(id,req.body,{new:true})
    res.json(book)
}
})

// update his comments own

router.put("/:id/:commenntId", async (req,res,next)=>{
    let bookId=req.params.id;
    let commenntId= req.params.commenntId;
    let book= await Book.findById(bookId).populate("userId");
let user= req.users;
if(user.email == book.userId.email){
    let books= await Book.findById(bookId).populate("commentId")
        if(book.commentId.includes(commenntId)){
            let bookdata = await Comment.findByIdAndUpdate(commenntId,req.body,{new: true});
            res.json(books)  
        }
    }
})

// add book his cart 
router.get("/:userId/:bookId", async(req,res,next)=>{
    let userId= req.params.userId;
    let bookId= req.params.bookId;
    let user= await User.findByIdAndUpdate(userId,{$push :{cart: bookId}},{new: true})
    res.json(user)
})








module.exports=router;