const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');
const auth = require('../middleware/auth');


router.get('/',commentController.getAllComment);
router.put('/:id', commentController.modifyComment);
router.post('/:id',commentController.createComment);

module.exports= router;