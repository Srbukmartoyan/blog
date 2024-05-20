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
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Author must have an email' },
        notEmpty: { msg: 'Email must not be empty' },
        isEmail: { msg: 'Must be a valid email address' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Author must have a password' },
        notEmpty: { msg: 'Password must not be empty' },
      }
    }
  }, {
    sequelize,
    tableName: 'authors',
    modelName: 'Author',
  });
  return Author;
};