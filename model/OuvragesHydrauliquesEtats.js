// OuvragesHydrauliquesEtats model
const Sequelize = require('sequelize');
const db = require('../Config/db');
const OuvragesHydrauliques = require('./OuvragesHydrauliques'); // Import OuvragesHydrauliques model
const CodeStandard = require('./CodeStandard'); // Import CodeStandard model

const OuvragesHydrauliquesEtats = db.define('ouvragesHydrauliques_etats', {

    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    ouvragesHydrauliquesId: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    codeStandardId: {
        type: Sequelize.UUID,
        allowNull: false,
       
    }
});

// Define associations
OuvragesHydrauliquesEtats.belongsTo(OuvragesHydrauliques, { foreignKey: 'ouvragesHydrauliquesId', onDelete: 'CASCADE' });
OuvragesHydrauliques.hasMany(OuvragesHydrauliquesEtats, { foreignKey: 'ouvragesHydrauliquesId', onDelete: 'CASCADE' });

OuvragesHydrauliquesEtats.belongsTo(CodeStandard, { foreignKey: 'codeStandardId', onDelete: 'CASCADE' });
CodeStandard.hasMany(OuvragesHydrauliquesEtats, { foreignKey: 'codeStandardId', onDelete: 'CASCADE' });

module.exports = OuvragesHydrauliquesEtats;
