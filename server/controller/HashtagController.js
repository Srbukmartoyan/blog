const { getAllhashtags : getAllhashtagsService } = require('../service/HashtagService.js');

 const getAllhashtags = async (req, res, next) => {
    try {
      const hashtags = await getAllhashtagsService();
      res.status(200).json(hashtags);
    } catch (err) {
      next(err);
    }
  }


module.exports = { getAllhashtags };