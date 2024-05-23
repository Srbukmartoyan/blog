'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Author, Image, Hashtag }) {
      this.belongsTo(Author, { foreignKey : 'authorId' });
      this.hasOne(Image, { foreignKey: 'postId',  onDelete : 'CASCADE' });
      this.belongsToMany(Hashtag, { 
        through: 'PostHashtag',
        foreignKey: 'postId',
        otherKey: 'hashtagId'
      });
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg : 'Post must have a title' },
        notEmpty: { msg: 'Title must not be empty' },
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg : 'Post must have a content' },
        notEmpty: { msg: 'Content must not be empty' },
      }
    }, 
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg : 'Post must have an excerpt' },
        notEmpty: { msg: 'Excerpt must not be empty' },
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts'
  });
  return Post;
};