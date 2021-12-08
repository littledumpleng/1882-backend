const Sequelize = require('sequelize');
const db = require('../config/database'); // outside the models folder inside the config folder into database

const Roles = db.define('roles', {
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      role_description: {
        type: DataTypes.STRING
      }
  //   },
  //   { freezeTableName: true, timestamps: false }
  // );
  // Roles.associate = (models) => {
  //   Roles.belongsToMany(models.Creators, { // a creator can have many roles
  //     foreignKey: 'creator_id',
  //     through: 
  //   });
  // // };
  // return Roles;
})

module.exports = Roles;
