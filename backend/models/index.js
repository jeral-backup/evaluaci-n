const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const VehicleModel = require('./vehicle');
const MaintenanceModel = require('./maintenance');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'forest_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    dialect: 'mysql',
    logging: false
  }
);

const User = UserModel(sequelize);
const Vehicle = VehicleModel(sequelize);
const Maintenance = MaintenanceModel(sequelize);

// relations
Vehicle.hasMany(Maintenance, { foreignKey: 'vehicleId', onDelete: 'CASCADE' });
Maintenance.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

module.exports = { sequelize, User, Vehicle, Maintenance };
