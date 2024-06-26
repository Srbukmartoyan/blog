const express = require('express');
const fetchUser = require('../middleware/auth.js');
const PostController = require('../controller/PostController.js');

const router = express.Router();

router.get('/', fetchUser, PostController.fetchAll);
router.get('/:id', fetchUser, PostController.findById);
router.post('/', fetchUser, PostController.create);
router.put('/:id', fetchUser, PostController.updateById);
router.delete('/:id', fetchUser, PostController.removeById);

module.exports = router;
