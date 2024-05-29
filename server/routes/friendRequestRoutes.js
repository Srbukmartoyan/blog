const express = require('express');
const FriendRequestController = require('../controller/FriendRequestController.js');

const router = express.Router();

router.post('/send', FriendRequestController.create);
router.put('/respond', FriendRequestController.respond);
router.get('/pending/:userId', FriendRequestController.fetchAll);

module.exports = router;