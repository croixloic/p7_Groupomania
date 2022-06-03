const express = require('express');
const router = express.Router();
const userController = require('../controller/createUser');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/signup', userController.signup); // ajouter auth et multer
router.post ('/login', userController.login);
router.get('/:id', userController.getOneUser);
router.get('/', userController.getAllUser);
router.put('/', auth, multer, userController.updateUser);
router.delete('/', auth, userController.deleteUser);


module.exports= router;