const Sequelize = require('sequelize');
const db = require('../config/database'); // outside the models folder inside the config folder into database

const MediaCreators = db.define('mediacreators', {
      media_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      creator_id: {
        type: DataTypes.INTEGER
      }
  //   },
  //   { freezeTableName: true, timestamps: false }
  // );
  // return MediaCreatorLinks;
}) 

module.exports = MediaCreators;