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

/*
 ASSOCIATIONS
*/

// Media - MediaType
db.Media.hasOne(db.MediaMediaType, {
  sourceKey: 'id',
  foreignKey: 'mediaId'
});

db.MediaMediaType.belongsTo(db.Media, {
  targetKey: 'id',
  foreignKey: 'mediaId'
});

db.MediaType.hasMany(db.MediaMediaType, {
  sourceKey: 'id',
  foreignKey: 'mediaTypeId'
});

db.MediaMediaType.belongsTo(db.MediaType, {
  targetKey: 'id',
  foreignKey: 'mediaTypeId'
});

// Media - Genre
db.Media.hasMany(db.MediaGenre, {
  sourceKey: 'id',
  foreignKey: 'mediaId',
  onDelete: 'cascade'
});

db.MediaGenre.belongsTo(db.Media, {
  targetKey: 'id',
  foreignKey: 'mediaId'
});

db.Genre.hasMany(db.MediaGenre, {
  sourceKey: 'id',
  foreignKey: 'genreId',
  onDelete: 'cascade'
});

db.MediaGenre.belongsTo(db.Genre, {
  targetKey: 'id',
  foreignKey: 'genreId',
  onDelete: 'cascade'
});

// Media - Theme
db.Media.hasMany(db.MediaTheme, {
  sourceKey: 'id',
  foreignKey: 'mediaId',
  onDelete: 'cascade'
});

db.MediaTheme.belongsTo(db.Media, {
  targetKey: 'id',
  foreignKey: 'mediaId'
});

db.Theme.hasMany(db.MediaTheme, {
  sourceKey: 'id',
  foreignKey: 'themeId',
  onDelete: 'cascade'
});

db.MediaTheme.belongsTo(db.Theme, {
  targetKey: 'id',
  foreignKey: 'themeId',
  onDelete: 'cascade'
});

// Media - Background
db.Media.hasMany(db.MediaBackground, {
  sourceKey: 'id',
  foreignKey: 'mediaId',
  onDelete: 'cascade'
});

db.MediaBackground.belongsTo(db.Media, {
  targetKey: 'id',
  foreignKey: 'mediaId'
});

db.Background.hasMany(db.MediaBackground, {
  sourceKey: 'id',
  foreignKey: 'backgroundId',
  onDelete: 'cascade'
});

db.MediaBackground.belongsTo(db.Background, {
  targetKey: 'id',
  foreignKey: 'backgroundId',
  onDelete: 'cascade'
});

module.exports = db;
