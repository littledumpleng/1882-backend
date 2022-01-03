// const Media stores everything in all_media table

const Sequelize = require('sequelize');
const db = require('../config/database'); // outside the models folder inside the config folder into database

const AllMedia = db.define('all_media', {
      media_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      media_title: {
        type: Sequelize.STRING
      },
      media_type: {
        type: Sequelize.STRING
      },
      media_release_year: {
        type: Sequelize.INTEGER
      },
      media_description: {
        type: Sequelize.STRING
      },
      media_duration: {
        type: Sequelize.STRING
      },
      albums_songs_number: {
        type: Sequelize.INTEGER
      },
      television_seasons_number: {
        type: Sequelize.INTEGER
      },
      audience_rating: {
        type: Sequelize.DECIMAL
      },
      show_still_airing: {
        type: Sequelize.STRING
      }
  //   },
  //   // { freezeTableName: true, timestamps: false }
  // );
  // Media.associate does a table join and lets you access data without needing a loop
  // when you get Media, you can get all of the Backgrounds related to it
  // Media.associate = (models) => {
  //   Media.belongsToMany(models.Backgrounds, {
  //     foreignKey: 'background_id'
  //   });
  // };
  // Media.associate = (models) => {
  //   Media.belongsToMany(models.Creators, {
  //     foreignKey: 'creator_id'
  //   });
  // };
  // Media.associate = (models) => {
  //   Media.belongsToMany(models.Themes, {
  //     foreignKey: 'theme_id'
  //   });
  // };
  // Media.associate = (models) => {
  //   Media.belongsToMany(models.Genres, {
  //     foreignKey: 'genre_id'
  //   });
  // };

}) 

module.exports = AllMedia;