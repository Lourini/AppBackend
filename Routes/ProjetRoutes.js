const express = require('express');
const router = express.Router();
const ProjetController = require('../Controllers/ProjetController');

// Route to create a new project
router.post('/projets', ProjetController.createProjet);

// Route to get all projects
router.get('/projets', ProjetController.getProjets);

// Route to get a project by ID
router.get('/projets/:id', ProjetController.getProjetById);

// Route to update a project by ID
router.put('/projets/:id', ProjetController.updateProjet);

// Route to delete a project by ID
router.delete('/projets/:id', ProjetController.deleteProjet);

// Route to get projects by clientId
router.get('/clients/projets/:clientId', ProjetController.getProjetsByClientId);

module.exports = router;
