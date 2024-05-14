'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hashtag extends Model {
    static associate({ Post }) {
      this.belongsToMany(Post, { through: 'PostHashtag', foreignKey: 'hashtagId',  otherKey: 'postId'});
    }
  }
  Hashtag.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg : 'Hashtag must have a name' },
        notEmpty: { msg: 'Name must not be empty' },
      }
    }
  }, {
    sequelize,
    tableName: 'hashtags',
    modelName: 'Hashtag',
  });
  return Hashtag;
};