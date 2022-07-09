'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  console.log("modelName", modelName);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// associations between tables
db.Media.hasMany(db.Review, {
  sourceKey: 'id',
  foreignKey: 'media_id'
});

db.Review.belongsTo(db.Media, {
  targetKey: 'id',
  foreignKey: 'media_id'
});

// Post.belongsTo(User, {
//   targetKey: 'id',
//   foreignKey: 'user_id'
// });

// User.hasMany(Post, {
//   sourceKey: 'id',
//   foreignKey: 'user_id'
// });

// Comment.belongsTo(Post, {
//   targetKey: 'id',
//   foreignKey: 'post_id'
// });

// Post.hasMany(Comment, {
//   sourceKey: 'id',
//   foreignKey: 'post_id'
// });

// Comment.belongsTo(User, {
//   targetKey: 'id',
//   foreignKey: 'user_id'
// });

// User.hasMany(Comment, {
//   sourceKey: 'id',
//   foreignKey: 'user_id'
// });

module.exports = db;
