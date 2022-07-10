'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const today = new Date();
    return queryInterface.bulkInsert('MediaTypes',
      ['Album', 'Article', 'Book', 'Documentary', 'Film', 'Poetry', 'Television Series'].map(name => ({
        name,
        createdAt: today,
        updatedAt: today
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('MediaTypes', null, {});
  }
};
