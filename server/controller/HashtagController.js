const HashtagService = require('../service/HashtagService.js');

const HashtagController = {
  getAllhashtags : async (req, res, next) => {
    try {
      const hashtags = await HashtagService.getAllhashtags();
      res.status(200).json(hashtags);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = HashtagController;