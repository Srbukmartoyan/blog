const { where } = require('sequelize');
const { FriendRequest, Author } = require('../models');

const create = async (requesterId, recipientId) => {
    if (requesterId === recipientId) {
        throw new Error('Cannot send friend request to ypourself');
    }

    const existingRequest = await FriendRequest.count({
        where: { requesterId, recipientId },
    });

    if (existingRequest > 0) {
        throw new Error('Friend request already sent');
    }

    const friendRequest = await FriendRequest.create({ requesterId, recipientId });
    return friendRequest;
};

const respond = async (requestId, status) => {
    const validStatuses = ['accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
        throw new Error('Invalid status');
    }

    const friendRequest = await FriendRequest.findByPk(requestId);
    if (!friendRequest) {
        throw new Error('Friend request not found');
    }

    friendRequest.status = status;
    await friendRequest.save();
    return friendRequest;
};

const fetchAll = async (userId) => {
    const friendRequests = await FriendRequest.findAll({ 
        where: { 
            recipientId: userId,
            status: 'pending', 
        },
        include: [{ model : Author, as: 'requester' }], // as: "..." does not associate author objects it is olny a name/label of associated author objects
    });

    return friendRequests;
};

module.exports = { create, respond, fetchAll };