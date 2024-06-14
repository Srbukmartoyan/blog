const { Op } = require('sequelize');
const { Post, Author, Hashtag, Image } = require('../models');
const { handleServiceError } = require('../middleware/errorHandler.js');

const fetchAll = async (page, limit, searchTerm, selectedHashtags) => {
  try {
    let options = {
      include: [{ model: Author }]
    };

    if (selectedHashtags && selectedHashtags.length > 0) {
      options.include.push({
        model: Hashtag,
        where: { id: { [Op.in]: selectedHashtags } },
        through: { attributes: [] } 
      });
    }

    if (searchTerm) {
      options.where = {
        // [Op.or]: [
        title: { [Op.like]: `%${searchTerm}%` },
          // { '$Author.name$': { [Op.like]: `%${searchTerm}%` } },
        // ],
      }
    }

    if (page && limit) {
      const offset = (page - 1) * limit;
      options.limit = limit;
      options.offset = offset;
    }
    const { count, rows: posts } = await Post.findAndCountAll(options);
    return { count, posts };
  } catch (err) {
    handleServiceError(err);
  }
};

const findById = async (id) => {
  try {
    const post = await Post.findByPk(id, {
      include: [
        { model: Author },
        { model: Image },
        { model: Hashtag, },
      ]
    });
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  } catch (err) {
    handleServiceError(err);
  }
};

const create = async (title, content, excerpt, author, image, selectedCategories) => {
  try {
    const post = await Post.create({ title, content, excerpt, authorId: author.id });

    if (image) {
      const newImage = await Image.create({ url: image, postId: post.id });
      await post.setImage(newImage);
    }

    for (const category of selectedCategories) {
      const hashtag = await Hashtag.findOne({ where: { name: category } });
      await post.addHashtags(hashtag);
    }
    return post;
  } catch (err) {
    handleServiceError(err);
  }
};

const  updateById = async (title, content, excerpt, id, image, selectedCategory) => {
  try {
    const post = await Post.findByPk(id, { include: [Author, Image, Hashtag] });
    if (!post) {
      throw new Error('Post not found');
    }
    post.title = title;
    post.content = content;
    post.excerpt = excerpt;
    await post.save(); // after post is added to database, associations are seted
    if (image) {
      const newImage = await Image.create({ url: image, postId: id });
      await post.setImage(newImage);
    } else {
      await post.Image?.destroy();
    }

    const hashtags = await Promise.all(selectedCategory.map(category => Hashtag.findOne({ where: { name: category } })));
    await post.setHashtags(hashtags);
    return post;
  } catch (err) {
    handleServiceError(err);
  }
};

const removeById = async (id) => {
  try {
    const post = await Post.findByPk(id, { include: [Image, Hashtag] });
    if (!post) {
      throw new Error('Post not found');
    }
    await post.destroy();
    return { message: 'post deleted!' };
  } catch (err) {
    handleServiceError(err);
  }
};


module.exports = { fetchAll, findById, create,  updateById, removeById };