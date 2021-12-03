const Sequelize = require('sequelize');
const db = require('../config/database'); // outside the models folder inside the config folder into database

const Genres = db.define('genres', {
      genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      genre: {
        type: DataTypes.STRING
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  // Genres.associate = (models) => {
  //   Genres.belongsToMany(models.Media, {
  //     foreignKey: 'media_id'
  //   });
  // };
})

module.exports = Genres;