'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const today = new Date();
    return queryInterface.bulkInsert('Genres',
      ['Action and Adventure', 'Autobiography', 'Biography', 'Children\'s', 'Coming-of-age', 'Diary', 'Drama', 'History', 'Fiction', 'Comedy', 'Journal', 'Memoir', 'Philosophy', 'Romance', 'Young Adult', 'Alternative', 'Blues', 'Dance', 'Electronic', 'Hip-hop/Rap', 'Indie Pop', 'Inspirational', 'J-pop', 'Jazz', 'K-pop', 'Pop', 'R&B/Soul', 'Rock', 'Indie Film', 'Short Story', 'Nonfiction', 'Op-Ed'].map(name => ({
        name,
        createdAt: today,
        updatedAt: today
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
