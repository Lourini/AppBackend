// Client.js
const Sequelize = require('sequelize');
const db = require('../Config/db');
const ZoneEtude = require('./ZoneEtude'); // Import ZoneEtude model

const Client = db.define('client', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    numClient: {
        type: Sequelize.STRING,
        allowNull: false,
        unique : true
    },
    denomination: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    adresse: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    adresse_2eme_ligne: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    pays: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    province: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    ville: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    code_postal: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telephone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telephone_mobile: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    adresse_email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    prenom_contact_principal: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nom_contact_principal: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

// Define one-to-one association with ZoneEtude with cascading delete
Client.hasOne(ZoneEtude, { foreignKey: 'clientId', onDelete: 'CASCADE' }); // Client has one ZoneEtude
ZoneEtude.belongsTo(Client, { foreignKey: 'clientId', onDelete: 'CASCADE' }); // ZoneEtude belongs to one Client

module.exports = Client;
