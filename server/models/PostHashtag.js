'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostHashtag extends Model {
    static associate({ Post, Hashtag }) {
      this.belongsTo(Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });

      this.belongsTo(Hashtag, {
        foreignKey: 'hashtagId',
        onDelete: 'CASCADE',
      })
    }
  }
  PostHashtag.init({}, {
    sequelize,
    modelName: 'PostHashtag',
    tableName: 'postHashtags',
  });
  return PostHashtag;
};