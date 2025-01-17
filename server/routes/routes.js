const express = require('express');
const upload = require('../config/multerConfig.js');
const fetchUser = require('../middleware/auth.js');
const { validatePassword } = require('../middleware/errorHandler.js')

const FileUploadController = require('../controller/FileUploadController.js');
const PostController = require('../controller/PostController.js');
const HashtagController = require('../controller/HashtagController.js');
const AuthController = require('../controller/AuthController.js');
const UserController = require('../controller/UserController.js');

const router = express.Router();

router.get('/posts', PostController.getAllPosts);
router.get('/posts/:id', PostController.getPost);
router.post('/posts', fetchUser, PostController.createPost);
router.put('/posts/:id', PostController.updatePost);
router.delete('/posts/:id', PostController.deletePost);

router.get('/hashtags', HashtagController.getAllhashtags);
router.post('/upload', upload.single('post-img'), FileUploadController.uploadFile);

router.post('/signup', validatePassword, AuthController.signup);
router.post('/signin', AuthController.signin);

router.get('/user/posts', fetchUser, UserController.getAllPosts);
router.get('/user/profile', fetchUser, UserController.getProfile);
router.get('/authors/:authorId/posts', UserController.getAuthorPosts);


module.exports = router;