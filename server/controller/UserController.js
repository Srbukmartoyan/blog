const UserService = require('../service/UserService.js')

const UserController = {
    getAllPosts: async (req, res) => {
        try {
            const userId = req.user.id;
            const posts = await UserService.getUserPosts(userId);
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getProfile: async (req, res) => {
        try {
            const user = req.user;
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user profile' });
        } 
    },
    getAuthorPosts: async (req, res) => {
        const { authorId } = req.params;
        try {
          const posts = await UserService.getUserPosts(authorId);
          res.status(200).json(posts);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch author\'s posts' });
        }
    }
}

module.exports = UserController;