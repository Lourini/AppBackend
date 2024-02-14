const express = require('express');
const router = express.Router();
const AnomalieController = require('../Controllers/AnomalieController');

// Route to create a new anomaly
router.post('/anomalies', AnomalieController.createAnomalie);

// Route to get anomalies by project ID
router.get('/projet/anomalies/:id', AnomalieController.getAnomaliesByProjetId);

// Route to get a single anomaly by ID
router.get('/anomalies/:id', AnomalieController.getAnomalieById);

// Route to update an anomaly by ID
router.put('/anomalies/:id', AnomalieController.updateAnomalie);

// Route to delete an anomaly by ID
router.delete('/anomalies/:id', AnomalieController.deleteAnomalie);

module.exports = router;
