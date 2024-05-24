const express = require('express');
const HashtagController = require('../controller/HashtagController.js');

const router = express.Router();

router.get('/', HashtagController.fetchAll);

module.exports = router;
