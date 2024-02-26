const Sequelize = require('sequelize');
const db = require('../Config/db');
const Projets = require('./Projet');

const Event = db.define('event', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
});

// Define association with Projets (Project)
Event.belongsTo(Projets, { foreignKey: 'projectId', onDelete: 'CASCADE' });
Projets.hasMany(Event, { foreignKey: 'projectId', onDelete: 'CASCADE' });

module.exports = Event;
