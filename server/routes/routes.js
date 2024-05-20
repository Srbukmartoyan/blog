const express = require('express');
const upload = require('../config/multerConfig.js');
const fetchUser = require('../middleware/auth.js');

const FileUploadController = require('../controller/FileUploadController.js');
const PostController = require('../controller/PostController.js');
const HashtagController = require('../controller/HashtagController.js');
const AuthController = require('../controller/AuthController.js');

const router = express.Router();

router.get('/posts', PostController.getAllPosts);
router.get('/posts/:id', PostController.getPost);
router.post('/posts', fetchUser, PostController.createPost);
router.put('/posts/:id', PostController.updatePost);
router.delete('/posts/:id', PostController.deletePost);
router.get('/hashtags', HashtagController.getAllhashtags);
router.post('/upload', upload.single('post-img'), FileUploadController.uploadFile);
router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);



module.exports = router;