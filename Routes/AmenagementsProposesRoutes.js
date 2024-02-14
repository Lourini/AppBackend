const express = require('express');
const router = express.Router();
const AmenagementsProposesController = require('../Controllers/AmenagementsProposesController');

// Route to create a new amenagement propose
router.post('/AmenagementsProposes', AmenagementsProposesController.createAmenagementPropose);

// Route to get amenagements proposes by project ID
router.get('/project/AmenagementsProposes/:id', AmenagementsProposesController.getAmenagementsProposesByProjetId);

// Route to get a single amenagement propose by ID
router.get('/AmenagementsProposes/:id', AmenagementsProposesController.getAmenagementProposeById);

// Route to update an amenagement propose by ID
router.put('/AmenagementsProposes/:id', AmenagementsProposesController.updateAmenagementPropose);

// Route to delete an amenagement propose by ID
router.delete('/AmenagementsProposes/:id', AmenagementsProposesController.deleteAmenagementPropose);

module.exports = router;
