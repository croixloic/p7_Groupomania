const express = require('express');
const router = express.Router();
const userController = require('../controller/createUser');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/signup', userController.signup); 
router.post ('/login', userController.login);
router.get('/profil', auth, userController.getOneUser);
router.get('/', userController.getAllUser);
router.put('/', auth, multer, userController.updateUser);
router.delete('/', auth, userController.deleteUser);

router.get("/logout",auth, userController.logout);

module.exports= router;