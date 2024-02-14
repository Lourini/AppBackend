const Sequelize = require('sequelize');
const db = require('../Config/db');
const Projets = require('./Projet'); // Import Projets model
const CodeStandard = require('./CodeStandard'); // Import CodeStandard model

const AmenagementsProposes = db.define('amenagementsProposes', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    projetId: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    type: {
        type: Sequelize.ENUM('Ouvrage hydraulique', 'Corps de la chaussée'),
        allowNull: false,
    },
    designationId: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    amenagementId: {
        type: Sequelize.UUID,
        allowNull: false,
    }
});

// Define associations with Projets and CodeStandard
AmenagementsProposes.belongsTo(Projets, { foreignKey: 'projetId', onDelete: 'CASCADE' }); // Each AmenagementsProposes belongs to one project
Projets.hasMany(AmenagementsProposes, { foreignKey: 'projetId', onDelete: 'CASCADE' }); // Each project can have multiple AmenagementsProposes

AmenagementsProposes.belongsTo(CodeStandard, { foreignKey: 'designationId', as: 'designation'}); // Each AmenagementsProposes has one designation according to a code standard
CodeStandard.hasMany(AmenagementsProposes, { foreignKey: 'designationId'});
AmenagementsProposes.belongsTo(CodeStandard, { foreignKey: 'amenagementId', as: 'amenagement'}); // Each AmenagementsProposes has one amenagement according to a code standard
CodeStandard.hasMany(AmenagementsProposes, { foreignKey: 'amenagementId'});


module.exports = AmenagementsProposes;
