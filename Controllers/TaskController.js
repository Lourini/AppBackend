const AmenagementsProposes = require('../model/AmenagementsProposes');
const Anomalie = require('../model/Anomalie');
const OuvragesHydrauliques = require('../model/OuvragesHydrauliques');
const Task = require('../model/Tasks');
const User = require('../model/User');

// Function to create a new task
exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get tasks by project ID
exports.getTasksByProjetId = async (req, res) => {
    const projetId = req.params.id;
  
    try {
      const tasks = await Task.findAll({ where: { projetId },include : [
        { model: User, as: 'createdBy' },
        { model: AmenagementsProposes, as: 'amenagementTask' },
        { model: Anomalie, as: 'anomalieTask' },
        { model: OuvragesHydrauliques, as: 'ouvrageTask' },
        { model: User, as: 'assignedTo' }
      ] });
  
      if (!tasks || tasks.length === 0) {
        return res.status(404).json({ error: 'Tasks not found for the specified project ID' });
      }
  
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to get a single task by ID
exports.getTaskById = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to update a task by ID
exports.updateTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const updatedTask = await Task.findByPk(taskId);

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await updatedTask.update(req.body);

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete a task by ID
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findByPk(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await deletedTask.destroy();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
