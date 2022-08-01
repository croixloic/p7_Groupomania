const express = require('express');
const router = express.Router();
const postController = require('../controller/postsController');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');


router.get('/', postController.getAllPosts);
router.get ('/:id', postController.getOnePost);
router.post('/', auth, multer, postController.createPost);
router.post('/like/:id', auth, postController.likePost);
router.put('/:id',auth, multer, postController.postModify);
router.delete('/:id', auth, postController.deletePost);

module.exports= router;