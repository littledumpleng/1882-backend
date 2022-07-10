module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define("Media", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      _autoGenerated: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
    },
  });
  return Media;
};
