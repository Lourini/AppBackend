const Sequelize = require('sequelize');
const db = require('../Config/db');
const Projets = require('./Projet'); // Import Projets model

const DonneTrocons = db.define('donneTrocons', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    projetId: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    pointDepart: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    pointArrivee: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    lineaire: {
        type: Sequelize.DECIMAL,
        allowNull: true,
    },
    largeur: {
        type: Sequelize.DECIMAL,
        allowNull: true,
    },
    gnbProjet: {
        type: Sequelize.DECIMAL,
        allowNull: true,
    },
    gnfProjet: {
        type: Sequelize.DECIMAL,
        allowNull: true,
    }
});

// Define association with Projets
DonneTrocons.belongsTo(Projets, { foreignKey: 'projetId', onDelete: 'CASCADE' }); // Each DonneTrocons belongs to one project
Projets.hasMany(DonneTrocons, { foreignKey: 'projetId', onDelete: 'CASCADE' }); // Each project can have multiple DonneTrocons

module.exports = DonneTrocons;
