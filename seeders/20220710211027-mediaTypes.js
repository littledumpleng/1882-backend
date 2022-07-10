'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const today = new Date();
    return queryInterface.bulkInsert('MediaTypes', [
      {
        name: 'Album',
        createdAt: today,
        updatedAt: today
      },
      {
        name: 'Article',
        createdAt: today,
        updatedAt: today
      },
      {
        name: 'Book',
        createdAt: today,
        updatedAt: today
      },
      {
        name: 'Documentary',
        createdAt: today,
        updatedAt: today
      },
      {
        name: 'Film',
        createdAt: today,
        updatedAt: today
      },
      {
        name: 'Poetry',
        createdAt: today,
        updatedAt: today
      },
      {
        name: 'Television Series',
        createdAt: today,
        updatedAt: today
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('MediaTypes', null, {});
  }
};
