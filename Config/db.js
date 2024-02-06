// db.js
const Sequelize = require('sequelize');

const db = new Sequelize('fieldback', 'olourini', 'UCvG@h5yZkE5GfU', {
  host: '185.166.39.250',
  dialect: 'mysql',
  // Add other configurations as needed
});

module.exports = db;
