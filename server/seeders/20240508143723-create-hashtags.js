'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('hashtags', [{
       name: '#learnCSS',
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
      name: '#learnHTML',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '#learnREACT',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '#learnEXPRESS',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('hashtags', null, {});
  }
};
