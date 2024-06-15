const { fetchAll: fetchAllService, findById: findByIdService, create: createService, updateById: updateByIdService, removeById: removeByIdService } = require('../service/PostService.js');
const { checkRequiredFields } = require('../middleware/errorHandler.js');

const fetchAll = async (req, res, next) => {
  try {
    const {page, limit, search, hashtags} = req.query;
    const parsedPage = (page != 'undefined') ? parseInt(page) : null;
    const parsedlimit = (limit != 'undefined') ? parseInt(limit) : null;
    const searchTerm = (search != 'undefined') ? search : "";
    const selectedHashtags = hashtags.trim().length > 0 ? hashtags.split(',').map(id => parseInt(id)) : [];

    const { count, posts } = await fetchAllService(parsedPage, parsedlimit, searchTerm, selectedHashtags);
    res.status(200).json({ count, posts });
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await findByIdService(id);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  const { title, content, excerpt, image, selectedCategory } = req.body;

  const requiredFields = ['title', 'content', 'excerpt', 'selectedCategory'];
  const missingFieldError = checkRequiredFields(req.body, requiredFields);
  if (missingFieldError) {
    const { statusCode, message } = missingFieldError;
    return res.status(statusCode).json({ error: message });
  }

  try {
    const author = req.user;
    const post = await createService(title, content, excerpt, author, image, selectedCategory);
    res.status(201).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, excerpt, image, selectedCategory } = req.body;

  const requiredFields = ['title', 'content', 'excerpt', 'selectedCategory'];
  const missingFieldError = checkRequiredFields(req.body, requiredFields);
  if (missingFieldError) {
    const { statusCode, message } = missingFieldError;
    return res.status(statusCode).json({ error: message });
  }

  try {
    const post = await updateByIdService(title, content, excerpt, id, image, selectedCategory);
    res.status(200).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

const removeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await removeByIdService(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


module.exports = { fetchAll, findById, create, updateById, removeById };