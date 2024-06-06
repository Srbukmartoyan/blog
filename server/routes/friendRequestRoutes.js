const express = require('express');
const FriendRequestController = require('../controller/FriendRequestController.js');
const fetchUser = require('../middleware/auth.js');

const router = express.Router();

router.post('/send', fetchUser, FriendRequestController.create);
router.put('/respond', fetchUser, FriendRequestController.respond);
router.get('/friends', fetchUser, FriendRequestController.fetchFriends);
router.delete('/unsend', fetchUser, FriendRequestController.unsend);
router.delete('/remove', fetchUser, FriendRequestController.remove);

module.exports = router;

