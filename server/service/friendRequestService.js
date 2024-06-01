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

const findAndHandleReverseFriendRequest = async (requesterId, recipientId, status) => {
    let reverseFriendRequest = await FriendRequest.findOne({
        where: { requesterId: recipientId, recipientId: requesterId }
    });

    if (status === 'rejected' && reverseFriendRequest) {
        await reverseFriendRequest.destroy();
    } else if (status === 'accepted') {
        if (!reverseFriendRequest) {
            reverseFriendRequest = await FriendRequest.create({
                requesterId: recipientId,
                recipientId: requesterId,
                status: status
            });
        } else {
            reverseFriendRequest.status = status;
            await reverseFriendRequest.save();
        }
    }

    return reverseFriendRequest;
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

    const { requesterId, recipientId } = friendRequest;

    if (status === 'rejected') {
        await friendRequest.destroy();

        await findAndHandleReverseFriendRequest(requesterId, recipientId, status);

        return { message: 'Friend request rejected and deleted' };
    }

    friendRequest.status = status;
    await friendRequest.save();

    await findAndHandleReverseFriendRequest(requesterId, recipientId, status);

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

const fetchStatus = async (requesterId, recipientId) => {
    const existingRequest = await FriendRequest.findOne({
        where : { requesterId, recipientId },
    });

    let status = 'none';
    if (existingRequest) {
        status = existingRequest.status;
    }

    return status;
}

module.exports = { create, remove, respond, fetchAll, fetchStatus };