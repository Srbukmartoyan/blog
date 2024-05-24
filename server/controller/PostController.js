const { getAllPosts: getAllPostsService, getPost: getPostService, createPost: createPostService, updatePost: updatePostService, deletePost: deletePostService } = require('../service/PostService.js');
const { checkRequiredFields } = require('../middleware/errorHandler.js');

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await getAllPostsService();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

const getPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await getPostService(id);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  console.log(req.body, 'req.user:', req.user);
  const { title, content, excerpt, image, selectedCategory } = req.body;

  const requiredFields = ['title', 'content', 'excerpt', 'selectedCategory'];
  const missingFieldError = checkRequiredFields(req.body, requiredFields);
  if (missingFieldError) {
    const { statusCode, message } = missingFieldError;
    return res.status(statusCode).json({ error: message });
  }

  try {
    const author = req.user;
    const post = await createPostService(title, content, excerpt, author, image, selectedCategory);
    res.status(201).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, excerpt, image, selectedCategory } = req.body;

  const requiredFields = ['title', 'content', 'excerpt', 'selectedCategory'];
  const missingFieldError = checkRequiredFields(req.body, requiredFields);
  if (missingFieldError) {
    const { statusCode, message } = missingFieldError;
    return res.status(statusCode).json({ error: message });
  }

  try {
    const post = await updatePostService(title, content, excerpt, id, image, selectedCategory);
    res.status(200).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await deletePostService(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


module.exports = { getAllPosts, getPost, createPost, updatePost, deletePost };