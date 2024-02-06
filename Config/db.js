// db.js
const Sequelize = require('sequelize');

const db = new Sequelize('database', 'user', 'pwd', {
  host: 'host',
  dialect: 'mysql',
  // Add other configurations as needed
});

module.exports = db;
