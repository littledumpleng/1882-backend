module.exports = (sequelize, DataTypes) => {
  const MediaMediaType = sequelize.define("MediaMediaType", {
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
    mediaTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return MediaMediaType;
};
