const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Maintenance', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    vehicleId: { type: DataTypes.INTEGER, allowNull: false },
    performedAt: { type: DataTypes.DATE, allowNull: false },
    description: { type: DataTypes.TEXT },
    cost: { type: DataTypes.DECIMAL(10,2) }
  }, {
    tableName: 'maintenances',
    timestamps: true
  });
};
