const Sequelize = require('sequelize');
const db = require('../config/database'); // outside the models folder inside the config folder into database

const MediaThemes = db.define('mediathemes', {
      media_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      theme_id: {
        type: DataTypes.INTEGER
      }
  //   },
  //   { freezeTableName: true, timestamps: false }
  // );
  // return MediaThemeLinks;
}) 

module.exports = MediaThemes;