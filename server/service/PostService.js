const { Post, Author, Hashtag, Image, PostHashtag } = require('../models');
const { handleServiceError } = require('../middleware/errorHandler.js');
 
const PostService = {
  getAllPosts: async () => {
    try {
      const posts = await Post.findAll({ include : [{ model : Author }] });
      return posts;
    } catch (err) {
      handleServiceError(err); 
    }
  },
  getPost: async (id) => {
    try {
      const post = await Post.findByPk(id, { 
        include : [
          { model : Author },
          { model: Image },
          { model: Hashtag,},
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
  createPost: async (title, content, excerpt, authorName, image, selectedCategories) => {
    try {
      let author = await Author.findOne({ where: { name: authorName } });
      if (!author) {
        author = await Author.create({ name: authorName });
      }
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
  updatePost: async (title, content, excerpt, id, authorName, image, selectedCategory) => {
    try {
      const post = await Post.findByPk(id, { include: [Author, Image, Hashtag] }); 
      if (!post) {
        throw new Error('Post not found');
      }
      if (post.Author.name !== authorName) {
        let author = await Author.findOne({ where: { name: authorName } });
        if (!author) {
          author = await Author.create({ name: authorName });
        }
        await post.setAuthor(author);
      }
      post.title = title;
      post.content = content;
      post.excerpt = excerpt;
      await post.save(); // after post is added to database, associations are seted
      if (image) {
        const newImage = await Image.create({ url: image, postId: id });
        await post.setImages([newImage]);
      }
      if (selectedCategory) {
        const hashtag = await Hashtag.findOne({ where: { name: selectedCategory } });
        if (hashtag) {
          await post.setHashtags([hashtag]);
        }
      }
      return post;
    } catch (err) {
      handleServiceError(err);
    }
  }, 
  deletePost: async (id) => {
    try {
      const post = await Post.findByPk(id);
      if (!post) {
        throw new Error('Post not found');
      }
      await post.destroy();
      return { message : 'post deleted!' };
    } catch (err) {
      handleServiceError(err);
    }
  }
}

module.exports = PostService;