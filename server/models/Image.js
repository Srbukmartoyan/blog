'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate({ Post }) {
      this.belongsTo(Post, { foreignKey : 'postId' });
    }
  }
  Image.init({
    url : {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Image',
    tableName: 'images',
  });
  return Image;
};