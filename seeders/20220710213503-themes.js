'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const today = new Date();
    return queryInterface.bulkInsert('Themes',
      ['Good vs. Evil', 'Love', 'Redemption', 'Courage and Perserverance', 'Revenge', 'Culture', 'Identity', 'Gender', 'Femininity', 'Masculinity', 'Sexuality', 'Age', 'Traditions', 'Immigration', 'Family', 'LGBTQ', 'Career', 'Alienation', 'Friendship', 'Violence', 'Activism'].map(name => ({
        name,
        createdAt: today,
        updatedAt: today
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Themes', null, {});
  }
};
