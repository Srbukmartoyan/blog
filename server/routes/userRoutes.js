const express = require('express');
const fetchUser = require('../middleware/auth.js');
const UserController = require('../controller/UserController.js');

const router = express.Router();

router.get('/', fetchUser, UserController.fetchAllUsers);
router.get('/my/posts', fetchUser, UserController.fetchMyPosts);
router.get('/:authorId/posts', fetchUser, UserController.fetchPostsByAuthorId);
router.get('/:authorId/profile', fetchUser, UserController.fetchProfileByAuthorId);

module.exports = router;
