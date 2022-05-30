const express = require('express');
const router = express.Router();
const postController = require('../controller/postsController');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');


router.get('/', postController.getAllPosts);
router.get ('/:id', postController.getOnePost);
router.post('/post', auth, postController.createPost);


module.exports= router;