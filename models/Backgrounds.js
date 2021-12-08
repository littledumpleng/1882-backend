const Sequelize = require('sequelize');
const db = require('../config/database'); // outside the models folder inside the config folder into database

const Backgrounds = db.define('backgrounds', {
      background_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      background: {
        type: DataTypes.STRING
      }
  //   },
  //   { freezeTableName: true, timestamps: false }
  // );
  // Backgrounds.associate = (models) => {
  //   Backgrounds.belongsToMany(models.Media, {
  //     foreignKey: 'media_id' // media_id is a fk in backgrounds
  //   });
  // };
  // return Backgrounds;
}) 

module.exports = Backgrounds;