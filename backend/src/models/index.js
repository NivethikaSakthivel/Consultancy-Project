const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require('./user.model.js')(sequelize, Sequelize);
db.budgets = require('./budget.model.js')(sequelize, Sequelize);
db.projects = require('./project.model.js')(sequelize, Sequelize);
db.services = require('./service.model.js')(sequelize, Sequelize);
db.presidents = require('./president.model.js')(sequelize, Sequelize);

// Define relationships
db.users.hasMany(db.budgets, { foreignKey: 'created_by', as: 'budgetEntries' });
db.budgets.belongsTo(db.users, { foreignKey: 'created_by', as: 'creator' });

module.exports = db;