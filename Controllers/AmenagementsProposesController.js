const Sequelize = require('sequelize');
const db = require('../Config/db');
const AmenagementsProposes = require('../model/AmenagementsProposes');

// Function to create a new amenagement propose
exports.createAmenagementPropose = async (req, res) => {
  try {
    const newAmenagementPropose = await AmenagementsProposes.create(req.body);
    res.status(201).json(newAmenagementPropose);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get amenagements proposes by project ID
exports.getAmenagementsProposesByProjetId = async (req, res) => {
    const projetId = req.params.id;
  
    try {
      const amenagementsProposes = await AmenagementsProposes.findAll({ where: { projetId } });
  
      if (!amenagementsProposes || amenagementsProposes.length === 0) {
        return res.status(404).json({ error: 'Amenagements proposes not found for the specified project ID' });
      }
  
      res.status(200).json(amenagementsProposes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to get a single amenagement propose by ID
exports.getAmenagementProposeById = async (req, res) => {
  const amenagementProposeId = req.params.id;

  try {
    const amenagementPropose = await AmenagementsProposes.findByPk(amenagementProposeId);

    if (!amenagementPropose) {
      return res.status(404).json({ error: 'Amenagement propose not found' });
    }

    res.status(200).json(amenagementPropose);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to update an amenagement propose by ID
exports.updateAmenagementPropose = async (req, res) => {
  const amenagementProposeId = req.params.id;

  try {
    const updatedAmenagementPropose = await AmenagementsProposes.findByPk(amenagementProposeId);

    if (!updatedAmenagementPropose) {
      return res.status(404).json({ error: 'Amenagement propose not found' });
    }

    await updatedAmenagementPropose.update(req.body);

    res.status(200).json(updatedAmenagementPropose);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete an amenagement propose by ID
exports.deleteAmenagementPropose = async (req, res) => {
  const amenagementProposeId = req.params.id;

  try {
    const deletedAmenagementPropose = await AmenagementsProposes.findByPk(amenagementProposeId);

    if (!deletedAmenagementPropose) {
      return res.status(404).json({ error: 'Amenagement propose not found' });
    }

    await deletedAmenagementPropose.destroy();

    res.status(200).json({ message: 'Amenagement propose deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
