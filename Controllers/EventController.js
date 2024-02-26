const Event = require('../model/Event');

// Create Event
exports.createEvent = async (req, res) => {
    try {
        const { title, startDate, endDate, projectId } = req.body;
        const event = await Event.create({ title, startDate, endDate, projectId });
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Read Events by Project ID
exports.getEventsByProjectId = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const events = await Event.findAll({ where: { projectId } });
        res.json(events);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update Event
exports.updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { name, startDate, endDate } = req.body;
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        await event.update({ name, startDate, endDate });
        res.json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        await event.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
