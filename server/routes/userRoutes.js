const express = require('express');
const fetchUser = require('../middleware/auth.js');
const UserController = require('../controller/UserController.js');

const router = express.Router();

router.get('/', UserController.fetchAllUsers);
router.get('/posts', fetchUser, UserController.fetchMyPosts);
router.get('/profile', fetchUser, UserController.fetchMyProfile);
router.get('/:authorId/posts', UserController.fetchPostsByAuthorId);
router.get('/:authorId/profile', UserController.fetchProfileByAuthorId);


module.exports = router;
