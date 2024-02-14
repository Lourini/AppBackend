// TypeOfConstruction.js
const Sequelize = require('sequelize');
const db = require('../Config/db');

const TypeOfConstruction = db.define('typeOfConstruction', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Endure: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Enpise: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Autre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    // Add other fields as needed
});

module.exports = TypeOfConstruction;
