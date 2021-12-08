const Sequelize = require('sequelize');
const db = require('../config/database'); // outside the models folder inside the config folder into database

const MediaBackgrounds = db.define('mediabackgrounds', {
      media_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      background_id: {
        type: DataTypes.INTEGER
      }
  //   },
  //   { freezeTableName: true, timestamps: false }
  // );
  // return MediaBackgroundLinks;
}) 

module.exports = MediaBackgrounds;