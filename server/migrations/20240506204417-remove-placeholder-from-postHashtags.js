'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('postHashtags', 'placeholder');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('postHashtags', 'placeholder', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
