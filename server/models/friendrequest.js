'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FriendRequest extends Model {
    static associate({ Author }) {
     this.belongsTo( Author, { as: 'requester', foreignKey: 'requesterId' });
     this.belongsTo( Author, { as: 'recipient', foreignKey: 'recipientId' });
    }
  }
  FriendRequest.init({
    status: {
      type : DataTypes.ENUM('pending', 'accepted', 'rejected'),
      defaultValue: 'pending',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'FriendRequest',
    tableName: 'friendRequests',
  });
  return FriendRequest;
};