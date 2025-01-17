const { Post, Author, Hashtag, Image } = require('../models');
const { handleServiceError } = require('../middleware/errorHandler.js');

const PostService = {
  getAllPosts: async () => {
    try {
      const posts = await Post.findAll({ include: [{ model: Author }] });
      return posts;
    } catch (err) {
      handleServiceError(err);
    }
  },
  getPost: async (id) => {
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
  },
  createPost: async (title, content, excerpt, author, image, selectedCategories) => {
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
  },
  updatePost: async (title, content, excerpt, id, image, selectedCategory) => {
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
  },
  deletePost: async (id) => {
    try {
      const post = await Post.findByPk(id, { include : [Image, Hashtag] });
      console.log(post);
      if (!post) {
        throw new Error('Post not found');
      }
      await post.destroy();
      return { message: 'post deleted!' };
    } catch (err) {
      handleServiceError(err);
    }
  }
}

module.exports = PostService;