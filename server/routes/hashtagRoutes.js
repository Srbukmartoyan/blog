const express = require('express');
const HashtagController = require('../controller/HashtagController.js');

const router = express.Router();

router.get('/', HashtagController.getAllhashtags);

module.exports = router;
