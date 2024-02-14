const express = require('express');
const router = express.Router();
const donneTroconsController = require('../Controllers/DonnesTroconsController');

// Routes for DonneTrocons
router.post('/donneTrocons', donneTroconsController.createDonneTrocons);
router.get('/donneTrocons/projet/:id', donneTroconsController.getDonneTroconsByProjetId);
router.get('/donneTrocons/:id', donneTroconsController.getDonneTroconsById);
router.put('/donneTrocons/:id', donneTroconsController.updateDonneTrocons);
router.delete('/donneTrocons/:id', donneTroconsController.deleteDonneTrocons);

module.exports = router;
