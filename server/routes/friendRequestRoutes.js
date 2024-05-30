const express = require('express');
const FriendRequestController = require('../controller/FriendRequestController.js');
const fetchUser = require('../middleware/auth.js');

const router = express.Router();

router.post('/send', fetchUser, FriendRequestController.create);
router.put('/respond', FriendRequestController.respond);
router.get('/pending/:userId', FriendRequestController.fetchAll);
router.get('/status/:userId', fetchUser, FriendRequestController.fetchStatus);
router.delete('/unsend', fetchUser, FriendRequestController.remove);

module.exports = router;