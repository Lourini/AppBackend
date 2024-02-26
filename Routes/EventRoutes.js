const express = require('express');
const router = express.Router();
const EventController = require('../Controllers/EventController');

// Create Event
router.post('/Event', EventController.createEvent);

// Read Events by Project ID
router.get('/project/Event/:projectId', EventController.getEventsByProjectId);

// Update Event
router.put('/Event/:id', EventController.updateEvent);

// Delete Event
router.delete('/Event/:id', EventController.deleteEvent);

module.exports = router;
