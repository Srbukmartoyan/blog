const express = require('express');
const HashtagController = require('../controller/HashtagController.js');
const fetchUser = require('../middleware/auth.js');

const router = express.Router();

router.get('/', fetchUser, HashtagController.fetchAll);

module.exports = router;
