'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate({ Post }) {
      this.belongsTo(Post, { foreignKey : 'postId', onDelete : 'CASCADE' });
    }
  }
  Image.init({
    url : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId : {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Image',
    tableName: 'images',
  });
  return Image;
};