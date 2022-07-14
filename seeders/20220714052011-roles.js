'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const today = new Date();
    return queryInterface.bulkInsert('Roles',
      [
        "Director",
        "Producer",
        "Writer",
        "Cinematographer",
        "Singer",
        "Songwriter",
        "Artist",
        "Publisher",
        "Actor",
        "Author",
        "Poet",
        "Rapper",
        "Art Designer",
        "Editor",
        "Illustrator",
        "Comedian",
        "Photographer",
      ].map(name => ({
        name,
        createdAt: today,
        updatedAt: today
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
