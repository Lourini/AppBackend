const Sequelize = require('sequelize');
const db = require('../Config/db');
const TypeOfConstruction = require('./TypeOfConstruction'); // Import TypeOfConstruction model

const ZoneEtude = db.define('zoneEtude', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    chefLieu: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    caidat: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    cercle: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    superficieTotale: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    nord: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    sud: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    est: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    ouest: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    typeClimat: {
        type: Sequelize.ENUM('Froid', 'Tempéré', 'Continental', 'Tropical', 'Désertique'),
        allowNull: false
    },
    pluviometrieMoyenneAnnuelle: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    temperatureMoyenneAnnuelle: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    temperatureMinimaleAnnuelle: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    temperatureMaximaleAnnuelle: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    ventsKmH: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    altitudeMaximale: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    altitudeMoyenne: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    altitudeMinimale: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    pourcentageHabitatsGroupes: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    pourcentageHabitatsDisperses: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
});

// Define one-to-many association with TypeOfConstruction
ZoneEtude.hasMany(TypeOfConstruction, { foreignKey: 'zoneEtudeId', onDelete: 'CASCADE' }); // ZoneEtude has many TypeOfConstruction
TypeOfConstruction.belongsTo(ZoneEtude, { foreignKey: 'zoneEtudeId', onDelete: 'CASCADE' }); // TypeOfConstruction belongs to one ZoneEtude

module.exports = ZoneEtude;
