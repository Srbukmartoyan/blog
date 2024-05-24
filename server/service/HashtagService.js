const { Hashtag } = require('../models');
const { handleServiceError } = require('../middleware/errorHandler.js');

const fetchAll = async () => {
  try {
    const hashtags = await Hashtag.findAll({ attributes: ['name', 'id'] });
    return hashtags;
  } catch (err) {
    handleServiceError(err);
  }
};


module.exports = { fetchAll };