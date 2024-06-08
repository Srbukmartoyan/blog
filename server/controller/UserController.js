const { fetchPosts: fetchPostsService, fetchAllUsers: fetchAllUsersService, fetchProfileByAuthorId: fetchProfileByAuthorIdService } = require('../service/UserService.js');

const fetchMyPosts = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const parsedPage = page ? parseInt(page) : null;
        const parsedlimit = limit ? parseInt(limit) : null;
        const userId = req.user.id;

        const { count, posts } = await fetchPostsService(userId, parsedPage, parsedlimit);
        res.status(200).json({ count, posts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const fetchPostsByAuthorId = async (req, res) => {
    try {
        const { authorId } = req.params;
        const { page, limit } = req.query;
        const parsedPage = page ? parseInt(page) : null;
        const parsedlimit = limit ? parseInt(limit) : null;

        const { count, posts } = await fetchPostsService(authorId, parsedPage, parsedlimit);
        res.status(200).json({ count, posts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch author\'s posts' });
    }
};

const fetchProfileByAuthorId = async (req, res) => {
    try {
        const { authorId } = req.params;
        const requesterId = req.user.id;
        const user = await fetchProfileByAuthorIdService(authorId, requesterId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};

const fetchAllUsers = async (req, res) => {
    try {
        const requesterId = req.user.id;
        const users = await fetchAllUsersService(requesterId);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { fetchMyPosts, fetchPostsByAuthorId, fetchProfileByAuthorId, fetchAllUsers };