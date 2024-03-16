const Blog = require("../models/blog");
const Comment = require("../models/comment");

exports.getPage = (req, res, next) => {
  const blogId = req.query.enableComment;
  let enableComment = false;
  let BLOGS = [];
  let COMMENTS = [];
  
  if( blogId > 0 )
    enableComment = true;
  Blog.findAll()
  .then((blogs) => {
    BLOGS = blogs; 
  })
  .then(() => {
    console.log('tttt', blogId)
    if(blogId && blogId > 0){
      return Comment.findAll({ where: { blogId: blogId}})
      .then((comments) => {
        COMMENTS = comments;
      }).catch(err => console.log(err)); 
    } 
  })
  .then(() => {
    console.log('bbbb', COMMENTS);
    res.render('blog', {
      blogs: BLOGS,
      comments: COMMENTS,
      enableComment: enableComment,
      blogId: blogId
    });
  })
  .catch(err => console.log(err)); 
};

exports.postAddBlog = (req, res, next) => {
  const url = req.body.url;
  const description = req.body.desc;
  Blog.create({
    image: url,
    description: description,
  })
  .then((result) => {
    res.redirect('/');
  }).catch(err => console.log(err));
};

exports.getComment = (req, res, next) => {
  const blogId = req.params;
  console.log(req.params);
  
  // const prodId = req.params.productId;
  // let enableComment = false;
  // let blogId = null;

  // enableComment = req.query.enableComment;
  // blogId = req.query.blogId;
  let BLOGS = [];
  Blog.findAll()
  .then((blogs) => {
    BLOGS = blogs;
  })
  .then(() => {
    Comment.findAll({ where: { blogId: blogId}})
    .then((comments) => {
      console.log(comments);
      return res.render('blog', {
        blogs: BLOGS,
        comments: comments,
        enableComment: true,
        blogId: blogId
      });
    }).catch(err => console.log(err));  
  })
  .catch(err => console.log(err));
  
};

exports.postComment = (req, res, next) => {
  const blogId = req.body.blogId;
  const comment = req.body.comment;
  const blogs = [];
  const comments = [];
  Comment.create({
    comment: comment,
    blogId: blogId
  })
  .then((comment) => {
    res.redirect('/blog/comment/'+blogId);
  })
  .catch(err => {
    console.log(err);
  })
  
  
}
