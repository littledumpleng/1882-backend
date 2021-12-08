const Sequelize = require('sequelize');
const db = require('../config/database'); // outside the models folder inside the config folder into database

const MediaGenres = db.define('mediagenres', {
      media_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      genre_id: {
        type: DataTypes.INTEGER
      }
  //   },
  //   { freezeTableName: true, timestamps: false }
  // );
  // return MediaGenreLinks;
}) 

module.exports = MediaGenres;