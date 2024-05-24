const express = require('express');
const fetchUser = require('../middleware/auth.js');
const PostController = require('../controller/PostController.js');

const router = express.Router();

router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPost);
router.post('/', fetchUser, PostController.createPost);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

module.exports = router;
