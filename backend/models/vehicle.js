const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Vehicle', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    plate: { type: DataTypes.STRING, allowNull: false, unique: true },
    type: { type: DataTypes.STRING, allowNull: false },
    model: { type: DataTypes.STRING },
    notes: { type: DataTypes.TEXT }
  }, {
    tableName: 'vehicles',
    timestamps: true
  });
};
