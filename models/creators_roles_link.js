const Sequelize = require('sequelize');
const db = require('../config/database'); // outside the models folder inside the config folder into database

const CreatorsRoles = db.define('creatorsroles', {
      media_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      creator_id: {
        type: DataTypes.INTEGER
      },
      role_id: {
        type: DataTypes.INTEGER
      }
  //   },
  //   { freezeTableName: true, timestamps: false }
  // );
  // return CreatorRolesLinks;
}) 

module.exports = CreatorsRoles;