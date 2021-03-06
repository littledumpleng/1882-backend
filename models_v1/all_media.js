const { DataTypes } = require('sequelize');
const db = require('../config_v1/database');

const AllMedia = db.define('all_media', {
  media_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  media_title: {
    type: DataTypes.STRING
  },
  media_type: {
    type: DataTypes.STRING
  },
  media_release_year: {
    type: DataTypes.INTEGER
  },
  media_description: {
    type: DataTypes.STRING
  },
  media_duration: {
    type: DataTypes.STRING
  },
  albums_songs_number: {
    type: DataTypes.INTEGER
  },
  television_seasons_number: {
    type: DataTypes.INTEGER
  },
  audience_rating: {
    type: DataTypes.DECIMAL
  },
  show_still_airing: {
    type: DataTypes.STRING
  }
});