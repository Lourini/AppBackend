const express = require('express');
const router = express.Router();
const CodeStandardController = require('../Controllers/CodeStandardController');

// Route to create a new code standard
router.post('/CodeStandard', CodeStandardController.createCodeStandard);

// Route to get all code standards
router.get('/CodeStandard', CodeStandardController.getAllCodeStandards);

// Route to get a single code standard by ID
router.get('/CodeStandard/:id', CodeStandardController.getCodeStandardById);

// Route to get code standards by type
router.get('/CodeStandard/type/:type', CodeStandardController.getCodeStandardByType);

// Route to update a code standard by ID
router.put('/CodeStandard/:id', CodeStandardController.updateCodeStandard);

// Route to delete a code standard by ID
router.delete('/CodeStandard/:id', CodeStandardController.deleteCodeStandard);

module.exports = router;
