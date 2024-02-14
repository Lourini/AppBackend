const express = require('express');
const router = express.Router();
const OuvragesHydrauliquesController = require('../Controllers/OuvragesHydrauliquesController');

// Routes for Ouvrages Hydrauliques
router.post('/ouvragesHydrauliques', OuvragesHydrauliquesController.createOuvragesHydrauliques);
router.get('/projet/ouvragesHydrauliques/:id', OuvragesHydrauliquesController.getOuvragesHydrauliquesByProjetId);
router.get('/ouvragesHydrauliques/:id', OuvragesHydrauliquesController.getOuvragesHydrauliquesById);
router.put('/ouvragesHydrauliques/:id', OuvragesHydrauliquesController.updateOuvragesHydrauliques);
router.delete('/ouvragesHydrauliques/:id', OuvragesHydrauliquesController.deleteOuvragesHydrauliques);

module.exports = router;
