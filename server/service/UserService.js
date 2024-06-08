const { where } = require('sequelize');
const { Post, Author, FriendRequest } = require('../models');

const fetchPosts = async (userId, page, limit) => {
    try {
        let options = {
            where: { authorId: userId },
            include: [{ model: Author }]
        };
        if (page && limit) {
            const offset = (page - 1) * limit;
            options.limit = limit;
            options.offset = offset;
        }
        
        const { count, rows: posts } = await Post.findAndCountAll(options);
        return { count, posts };
    } catch (error) {
        throw new Error('Failed to fetch posts');
    }
}

const fetchProfileByAuthorId = async (userId, requesterId) => {

    const user = await Author.findByPk(userId, {
        include: [
            {
                model: FriendRequest,
                as: "receivedRequests",
                where: { requesterId: requesterId },
                required: false,
            }
        ]
    });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

const fetchAllUsers = async (requesterId) => {
    try {
        const users = await Author.findAll({
            include: [
                {
                    model: FriendRequest,
                    as: 'receivedRequests', // join user through foreignKey (here foreign key is recipientId => recipientid-nerin join kani)
                    where: { requesterId: requesterId },
                    required: false,
                }
            ]
        });
        return users;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
}
module.exports = { fetchPosts, fetchAllUsers, fetchProfileByAuthorId };