const {fetchPosts: fetchPostsService, fetchAllUsers: fetchAllUsersService } = require('../service/UserService.js');

const fetchPostsByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const posts = await fetchPostsService(userId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const fetchUserProfile = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile' });
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
}

const fetchAllUsers = async (req, res) => {
    try {
        const users = await fetchAllUsersService();
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { fetchPostsByUserId, fetchUserProfile, fetchPostsByAuthorId, fetchAllUsers };