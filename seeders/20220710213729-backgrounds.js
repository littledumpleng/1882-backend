'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const today = new Date();
    return queryInterface.bulkInsert('Backgrounds',
      ['American', 'Chinese', 'Indian', 'Filipino', 'Vietnamese', 'Korean', 'Japanese', 'Pakistani', 'Cambodian', 'Hmong', 'Thai', 'Laotian', 'Bangladeshi', 'Burmese', 'Nepalese', 'Indonesian', 'Sri Lankan', 'Malaysian', 'Bhutanese', 'Mongolian', 'Taiwanese', 'Asian (Unspecified)'].map(name => ({
        name,
        createdAt: today,
        updatedAt: today
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Backgrounds', null, {});
  }
};
