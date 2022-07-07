module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define("Theme", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      _autoGenerated: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Theme;
};
