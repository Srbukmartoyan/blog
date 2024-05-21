const PostService = require('../service/PostService.js');
const { checkRequiredFields } = require('../middleware/errorHandler.js');

const PostController = {
  getAllPosts: async (req, res, next) => {
    try {
      const posts = await PostService.getAllPosts();
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  },
  getPost: async(req, res, next) => {
    const { id } = req.params; 
    try {
      const post = await PostService.getPost(id);
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  },
  createPost: async (req, res, next) => {
    console.log(req.body, 'req.user:', req.user);
    const { title, content, excerpt, image, selectedCategory } = req.body; //assume that author is authenticated

    const requiredFields = ['title', 'content', 'excerpt', 'selectedCategory'];
    const missingFieldError = checkRequiredFields(req.body, requiredFields);
    if (missingFieldError) {
      const { statusCode, message } = missingFieldError;
      return res.status(statusCode).json({ error: message });
    }

    try {
      const author = req.user;
      const post = await PostService.createPost(title, content, excerpt, author, image, selectedCategory);
      res.status(201).json({ success : true, post});
    } catch (err) {
      next(err);
    }
  },
  updatePost: async (req, res, next) => {
    const { id } = req.params;
    const { title, content, excerpt, author, image, selectedCategory } = req.body;

    const requiredFields = ['title', 'content', 'excerpt', 'selectedCategory'];
    const missingFieldError = checkRequiredFields(req.body, requiredFields);
    if (missingFieldError) {
      const { statusCode, message } = missingFieldError;
      return res.status(statusCode).json({ error: message });
    }
    
    try {
      const post = await PostService.updatePost(title, content, excerpt, id, author, image, selectedCategory);
      res.status(200).json({ success : true, post});
    } catch (err) {
      next(err);
    }
  },
  deletePost: async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await PostService.deletePost(id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PostController;