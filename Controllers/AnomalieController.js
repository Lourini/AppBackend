const Anomalie = require('../model/Anomalie');

// Function to create a new anomaly
exports.createAnomalie = async (req, res) => {
  try {
    const newAnomalie = await Anomalie.create(req.body);
    res.status(201).json(newAnomalie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get anomalies by project ID
exports.getAnomaliesByProjetId = async (req, res) => {
    const projetId = req.params.id;
  
    try {
      const anomalies = await Anomalie.findAll({ where: { projetId } });
  
      if (!anomalies || anomalies.length === 0) {
        return res.status(404).json({ error: 'Anomalies not found for the specified project ID' });
      }
  
      res.status(200).json(anomalies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to get a single anomaly by ID
exports.getAnomalieById = async (req, res) => {
  const anomalyId = req.params.id;

  try {
    const anomaly = await Anomalie.findByPk(anomalyId);

    if (!anomaly) {
      return res.status(404).json({ error: 'Anomaly not found' });
    }

    res.status(200).json(anomaly);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to update an anomaly by ID
exports.updateAnomalie = async (req, res) => {
  const anomalyId = req.params.id;

  try {
    const updatedAnomaly = await Anomalie.findByPk(anomalyId);

    if (!updatedAnomaly) {
      return res.status(404).json({ error: 'Anomaly not found' });
    }

    await updatedAnomaly.update(req.body);

    res.status(200).json(updatedAnomaly);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete an anomaly by ID
exports.deleteAnomalie = async (req, res) => {
  const anomalyId = req.params.id;

  try {
    const deletedAnomaly = await Anomalie.findByPk(anomalyId);

    if (!deletedAnomaly) {
      return res.status(404).json({ error: 'Anomaly not found' });
    }

    await deletedAnomaly.destroy();

    res.status(200).json({ message: 'Anomaly deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
