const express = require('express');
const router = express.Router();
const TaskController = require('../Controllers/TaskController');

// Routes for tasks
router.post('/task', TaskController.createTask);
router.get('/project/task/:id', TaskController.getTasksByProjetId);
router.get('/task/:id', TaskController.getTaskById);
router.put('/task/:id', TaskController.updateTask);
router.delete('/task/:id', TaskController.deleteTask);

module.exports = router;
