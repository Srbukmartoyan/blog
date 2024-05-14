'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate({ Post }) {
      this.hasMany(Post, { foreignKey: 'authorId'});
    }
  }
  Author.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg : 'Author must have a name' },
        notEmpty: { msg: 'Name must not be empty' },
      }
    }
  }, {
    sequelize,
    tableName: 'authors',
    modelName: 'Author',
  });
  return Author;
};