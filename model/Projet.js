const Sequelize = require('sequelize');
const db = require('../Config/db');
const Client = require('./Client'); // Import Client model
const User = require('./User'); // Import Client model

const Projets = db.define('projets', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    nuProjet: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    titre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    numeroAppelOffre: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    typeProjet: {
        type: Sequelize.ENUM(
            'Génie de la Construction',
            'Génie Environnemental',
            'Génie Ferroviaire',
            'Génie Géotechnique',
            'Génie Hydraulique',
            'Génie Maritime',
            'Génie des Ponts',
            'Génie Routier',
            'Génie Sismique',
            'Génie des Structures',
            'Génie Urbain'
        ),
        allowNull: false,
    },
    lineaire: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    pointDepart: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    pointArrivee: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    planSituation: {
        type: Sequelize.BLOB,
        allowNull: true,
    },
    dateDebut: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    dateFin: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    contactPrincipale: {
        type: Sequelize.STRING, // Assuming it's a single string representing the name
        allowNull: true,
    },
    adresseMail: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isEmail: true,
        },
    },
    numeroTelephone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    adresse: {
        type: Sequelize.STRING, // Assuming it's a single string for simplicity
        allowNull: true,
    },
    modeCommunicationPrefere: {
        type: Sequelize.ENUM('Mail', 'Téléphone'), // Assuming two options
        allowNull: true,
    }
});

// Define association with Client
Projets.belongsTo(Client, { foreignKey: 'clientId', onDelete: 'CASCADE' }); // Each project belongs to one client
Client.hasMany(Projets, { foreignKey: 'clientId', onDelete: 'CASCADE' }); // Each client can have multiple projectst

// Define association with User
Projets.belongsTo(User, { foreignKey: 'ChefOfprojet'}); // Each project belongs to one ChefOfprojet
User.hasMany(Projets, { foreignKey: 'ChefOfprojet'}); // Each ChefOfprojet can have multiple projects

module.exports = Projets;
