module.exports = (sequelize, DataTypes) => {
  const AllMedia = sequelize.define("AllMedia", {
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
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  return AllMedia;
};