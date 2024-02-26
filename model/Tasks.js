const Sequelize = require('sequelize');
const db = require('../Config/db');
const Projets = require('./Projet'); // Import Projets model
const Anomalies = require('./Anomalie'); // Import Anomalies model
const OuvragesHydrauliques = require('./OuvragesHydrauliques'); // Import OuvragesHydrauliques model
const AmenagementsProposes = require('./AmenagementsProposes'); // Import AmenagementsProposes model
const Users = require('./User'); // Import Users model

const Tasks = db.define('tasks', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    projetId: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    anomalieId: {
        type: Sequelize.UUID,
        allowNull: true,
    },
    ouvrageId: {
        type: Sequelize.UUID,
        allowNull: true,
    },
    amenagementId: {
        type: Sequelize.UUID,
        allowNull: true,
    },
    numeroTache: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    creeeLe: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    creeePar: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    descriptionCourte: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    descriptionLongue: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    assigneeLe: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    assigneeA: {
        type: Sequelize.UUID,
        allowNull: true,
    },
    statut: {
        type: Sequelize.ENUM('A faire', 'Traitee', 'En cours'),
        allowNull: false,
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: true,
    }
});

// Define associations with Projets, Anomalies, OuvragesHydrauliques, AmenagementsProposes, and Users
Tasks.belongsTo(Projets, { foreignKey: 'projetId',}); // Each Task belongs to one project
Projets.hasMany(Tasks, { foreignKey: 'projetId',}); 

Tasks.belongsTo(Anomalies, { foreignKey: 'anomalieId', as: 'anomalieTask'}); // Each Task may belong to one anomaly
Anomalies.hasMany(Tasks, { foreignKey: 'anomalieId', as: 'anomalieTask'}); 

Tasks.belongsTo(OuvragesHydrauliques, { foreignKey: 'ouvrageId', as: 'ouvrageTask'}); // Each Task may belong to one ouvrage hydraulique
OuvragesHydrauliques.hasMany(Tasks, { foreignKey: 'ouvrageId', as: 'ouvrageTask'});

Tasks.belongsTo(AmenagementsProposes, { foreignKey: 'amenagementId', as: 'amenagementTask'}); // Each Task may belong to one amenagement propose
AmenagementsProposes.hasMany(Tasks, { foreignKey: 'amenagementId', as: 'amenagementTask'});

Tasks.belongsTo(Users, { foreignKey: 'creeePar', as: 'createdBy' }); // Each Task is created by one user
Users.hasMany(Tasks, { foreignKey: 'creeePar', as: 'createdBy' });

Tasks.belongsTo(Users, { foreignKey: 'assigneeA', as: 'assignedTo' }); // Each Task is assigned to one user
Users.belongsTo(Tasks, { foreignKey: 'assigneeA', as: 'assignedTo' });

module.exports = Tasks;
