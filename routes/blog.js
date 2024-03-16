const path = require('path');

const express = require('express');

const blogController = require('../controllers/blog');

const router = express.Router();

router.get('/', blogController.getPage);

router.post('/add-blog', blogController.postAddBlog);

router.get('/blog/comment/:blogId', blogController.getComment);

router.post('/blog/comment/:blogId', blogController.postComment);

module.exports = router;
