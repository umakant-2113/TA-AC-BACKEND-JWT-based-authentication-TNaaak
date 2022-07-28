let express = require('express');
let router = express.Router();

const Article = require('../model/Article');
let Comment=require("../model/Comment")

// create article
router.post('/', async (req, res, next) => {
  req.body.slug = req.body.title.split(' ').join('-');
  req.body.tagList = req.body.tagList.split(' ');
  let article = await Article.create(req.body);
  res.status(200).json(article);
});

// filter of articles
// Filter by tag:
router.get('/', async (req, res, next) => {
  let query = req.query;
  let articles = await Article.find(query);
  res.json(articles);
});
// Filter by author:
router.get('/', async (req, res, next) => {
  let query = req.query;
  let articles = await Article.find(query);
  res.json(articles);
});
// Favorited by user:

router.get('/', async (req, res, next) => {
  let query = req.query;
  let articles = await Article.find(query);
  res.json(articles);
});
// Limit number of articles (default is 20):

router.get('/', async (req, res, next) => {
  let query = req.query;
  let articles = await Article.find(query);
  res.json(articles);
});
// Offset/skip number of articles (default is 0):

// get articles useing slug

router.get('/:slug', async (req, res, next) => {
    let sulg=req.params.slug;
  let articles = await Article.find({slug});
  res.json(articles);
});

// update article

router.put('/:slug', async (req, res, next) => {
let slug=req.params.slug;
let articles= await Article.find({slug})
let article= await Article.findByIdAndUpdate( articles[0].id,req.body,{new:true});
res.json(article)
});

//delete article using slug

router.delete("/:slug", async(req,res,next)=>{
    let slug= req.params.slug;
    let articles= await Article.find({slug});
    let article= await Article.findByIdAndDelete(articles[0].id, {new:true});
    res.json(article)
})


// add comment in articles
router.post("/:slug/comment",  async(req,res,next)=>{
let slug= req.params.slug;
let comment= await Comment.create(req.body);
let articles= await Article.find({slug});
let article= await Article.findByIdAndUpdate(articles[0].id,{$push: {commentId: comment.id}},{new:true});
res.json(article)
})

// display comment from an articles

router.get("/:slug/comments", async(req,res,next)=>{
    let slug= req.params.slug;
    let articles= await Article.find({slug});
    let commentOfArticle= await Article.findById(articles[0].id).populate("commentId");
    res.json(commentOfArticle)
})

// tags lists

router.get("/taglist", async(req,res,next)=>{
let tags = await Article.find({}).distinct("tagList");
res.json(tags)
})


module.exports = router;
