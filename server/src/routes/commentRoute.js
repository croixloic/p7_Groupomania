const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');
const auth = require('../middleware/auth');


router.get('/:id',auth, commentController.getAllComment);
router.put('/:id',auth,  commentController.modifyComment);
router.post('/:id',auth, commentController.createComment);
router.delete('/:id', auth, commentController.deleteComment);

module.exports= router;