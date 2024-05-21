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
    }
}

module.exports = UserController;