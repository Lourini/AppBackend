const Sequelize = require('sequelize');
const db = require('../Config/db');
const Projets = require('./Projet'); // Import Projets model
const CodeStandard = require('./CodeStandard'); // Import CodeStandard model

const OuvragesHydrauliques = db.define('ouvragesHydrauliques', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    projetId: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    numeroLigne: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    typeId: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    coordonneesX: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    coordonneesY: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

// Define associations with Projets and CodeStandard
OuvragesHydrauliques.belongsTo(Projets, { foreignKey: 'projetId', onDelete: 'CASCADE' }); // Each OuvragesHydrauliques belongs to one project
Projets.hasMany(OuvragesHydrauliques, { foreignKey: 'projetId', onDelete: 'CASCADE' }); // Each project can have multiple OuvragesHydrauliques

OuvragesHydrauliques.belongsTo(CodeStandard, { foreignKey: 'typeId', as: 'type', onDelete: 'CASCADE'}); // Each OuvragesHydrauliques has one type according to a code standard
CodeStandard.hasMany(OuvragesHydrauliques, { foreignKey: 'typeId', onDelete: 'CASCADE'});


module.exports = OuvragesHydrauliques;
