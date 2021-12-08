const Sequelize = require('sequelize');
const db = require('../config/database'); // outside the models folder inside the config folder into database

const Themes = db.define('themes', {
      theme_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      theme: {
        type: DataTypes.STRING
      }
  //   },
  //   { freezeTableName: true, timestamps: false }
  // );
  // Themes.associate = (models) => {
  //   Themes.belongsToMany(models.Media, {
  //     foreignKey: 'media_id'
  //   });
  // };
  // return Themes;
})

module.exports = Themes;
