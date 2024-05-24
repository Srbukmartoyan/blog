const express = require('express');
const fetchUser = require('../middleware/auth.js');
const UserController = require('../controller/UserController.js');

const router = express.Router();

router.get('/posts', fetchUser, UserController.getAllPosts);
router.get('/profile', fetchUser, UserController.getProfile);
router.get('/:authorId/posts', UserController.getAuthorPosts);

module.exports = router;
