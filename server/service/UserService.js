const { Post, Author } = require('../models');

const fetchPosts = async (userId) => {
    try {
        const posts = await Post.findAll({ where: { authorId: userId }, include: [{ model: Author }] });
        return posts;
    } catch (error) {
        throw new Error('Failed to fetch posts');
    }
}

const fetchProfileByAuthorId = async (userId) => {
    
    const user = await Author.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

const fetchAllUsers = async () => {
    try {
        const users = await Author.findAll();
        return users;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }  
}
module.exports = { fetchPosts, fetchAllUsers, fetchProfileByAuthorId };