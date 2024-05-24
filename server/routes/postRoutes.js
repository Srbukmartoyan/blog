const express = require('express');
const fetchUser = require('../middleware/auth.js');
const PostController = require('../controller/PostController.js');

const router = express.Router();

router.get('/', PostController.fetchAll);
router.get('/:id', PostController.findById);
router.post('/', fetchUser, PostController.create);
router.put('/:id', PostController.updateById);
router.delete('/:id', PostController.removeById);

module.exports = router;
