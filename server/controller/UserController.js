const {fetchPosts: fetchPostsService, fetchAllUsers: fetchAllUsersService, fetchProfileByAuthorId: fetchProfileByAuthorIdService } = require('../service/UserService.js');

const fetchMyPosts = async (req, res) => {
    try {
        const userId = req.user.id;
        const posts = await fetchPostsService(userId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const fetchPostsByAuthorId = async (req, res) => {
    const { authorId } = req.params;
    try {
        const posts = await fetchPostsService(authorId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch author\'s posts' });
    }
};

const fetchProfileByAuthorId = async(req, res) => {
    try {
        const { authorId } = req.params;
        const requesterId = req.user.id;
        const user = await fetchProfileByAuthorIdService(authorId, requesterId);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ error : error.message })
    }
};

const fetchAllUsers = async (req, res) => {
    try {
        const requesterId = req.user.id;
        const users = await fetchAllUsersService(requesterId);
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { fetchMyPosts, fetchPostsByAuthorId, fetchProfileByAuthorId, fetchAllUsers };