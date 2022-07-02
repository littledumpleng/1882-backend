module.exports = (sequelize, DataTypes) => {
  const Creator = sequelize.define("Creator", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
  });

  return Creator;
};
