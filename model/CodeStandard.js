const Sequelize = require('sequelize');
const db = require('../Config/db');

const CodeStandard = db.define('codeStandard', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

module.exports = CodeStandard;
