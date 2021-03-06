module.exports = (sequelize, DataTypes) => {
  const MediaBackground = sequelize.define("MediaBackground", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      _autoGenerated: true
    },
    mediaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    backgroundId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return MediaBackground;
};
