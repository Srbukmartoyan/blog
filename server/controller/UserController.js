const { getUserPosts: getUserPostsService } = require('../service/UserService.js');

const getAllPosts = async (req, res) => {
    try {
        const userId = req.user.id;
        const posts = await getUserPostsService(userId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
};

const getAuthorPosts = async (req, res) => {
    const { authorId } = req.params;
    try {
        const posts = await getUserPostsService(authorId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch author\'s posts' });
    }
}

module.exports = { getAllPosts, getProfile, getAuthorPosts };