const Sequelize = require('sequelize');
const db = require('../Config/db');
const CodeStandard = require('./CodeStandard'); // Import CodeStandard model
const Projets = require('./Projet'); // Import Projets model

const Anomalie = db.define('anomalie', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    typeAnomalieId: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    etatAnomalie: {
        type: Sequelize.TEXT,
        allowNull: true,
    }
});


Anomalie.belongsTo(Projets, { foreignKey: 'projetId', onDelete: 'CASCADE' }); // Each anomaly belongs to one project
Projets.hasMany(Anomalie, { foreignKey: 'projetId', onDelete: 'CASCADE' }); // Each project can have multiple anomalies

Anomalie.belongsTo(CodeStandard, { foreignKey: 'typeAnomalieId' , onDelete: 'CASCADE'}); // Each anomaly has one type of anomaly according to a code standard
CodeStandard.hasMany(Anomalie, { foreignKey: 'typeAnomalieId' , onDelete: 'CASCADE'});
module.exports = Anomalie;
