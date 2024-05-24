const { fetchAll: fetchAllService } = require('../service/HashtagService.js');


const fetchAll = async (req, res, next) => {
  try {
    const hashtags = await fetchAllService();
    res.status(200).json(hashtags);
  } catch (err) {
    next(err);
  }
}

module.exports = { fetchAll };