'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('friendRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending',
        allowNull: false,
      },
      requesterId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'authors', // model is a tablename
          key : 'id' //pk of author table
        },
        onDelete: 'CASCADE',
      },
      recipientId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'authors',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('friendRequests');
  }
};