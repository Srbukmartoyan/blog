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

const remove = async (requesterId, recipientId) => {
    if (requesterId === recipientId) {
        throw new Error('Cannot unfollow yourself');
    }

    const existingRequest = await FriendRequest.findOne({
        where: { requesterId, recipientId },
    });

    if (!existingRequest) {
        throw new Error('friend request not found');
    }

    await existingRequest.destroy();
    return { message: 'Friend request deleted' };
}

const respond = async (requestId, status) => {
    const validStatuses = ['accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
        throw new Error('Invalid status');
    }

    const friendRequest = await FriendRequest.findByPk(requestId);
    if (!friendRequest) {
        throw new Error('Friend request not found');
    }

    if (status === 'rejected') {
        await friendRequest.destroy();
        return { message: 'Friend request rejected and deleted' };
    }
    friendRequest.status = status;
    await friendRequest.save();
    return friendRequest;
};

const fetchFriends = async (userId, type) => {
    let whereClause = {};
    let includeClause = [];

    switch (type) {
        case 'pending':
            whereClause = { recipientId: userId, status: 'pending' };
            includeClause = [{ model: Author, as: 'requester' }];
            break;
        case 'followers':
            whereClause = { recipientId: userId, status: 'accepted' };
            includeClause = [{ model: Author, as: 'requester' }];
            break;
        case 'followings':
            whereClause = { requesterId: userId, status: 'accepted' };
            includeClause = [{ model: Author, as: 'recipient' }];
            break;
        default:
            throw new Error('Invalid type');
    }

    const friends = await FriendRequest.findAll({
        where: whereClause,
        include: includeClause,
    });

    return friends;
};

module.exports = { create, remove, respond, fetchFriends };