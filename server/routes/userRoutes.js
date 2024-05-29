const express = require('express');
const fetchUser = require('../middleware/auth.js');
const UserController = require('../controller/UserController.js');

const router = express.Router();

router.get('/', UserController.fetchAllUsers);
router.get('/posts', fetchUser, UserController.fetchPostsByUserId);
router.get('/profile', fetchUser, UserController.fetchUserProfile);
router.get('/:authorId/posts', UserController.fetchPostsByAuthorId);

module.exports = router;
