const DonneTrocons = require('../model/DonnesTrocons');

// Function to create a new DonneTrocons
exports.createDonneTrocons = async (req, res) => {
  try {
    const newDonneTrocons = await DonneTrocons.create(req.body);
    res.status(201).json(newDonneTrocons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get DonneTrocons by project ID
exports.getDonneTroconsByProjetId = async (req, res) => {
    const projetId = req.params.id;
  
    try {
      const donneTrocons = await DonneTrocons.findAll({ where: { projetId } });
  
      if (!donneTrocons || donneTrocons.length === 0) {
        return res.status(404).json({ error: 'DonneTrocons not found for the specified project ID' });
      }
  
      res.status(200).json(donneTrocons);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Function to get a single DonneTrocons by ID
exports.getDonneTroconsById = async (req, res) => {
  const donneTroconsId = req.params.id;

  try {
    const donneTrocons = await DonneTrocons.findByPk(donneTroconsId);

    if (!donneTrocons) {
      return res.status(404).json({ error: 'DonneTrocons not found' });
    }

    res.status(200).json(donneTrocons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to update a DonneTrocons by ID
exports.updateDonneTrocons = async (req, res) => {
  const donneTroconsId = req.params.id;

  try {
    const updatedDonneTrocons = await DonneTrocons.findByPk(donneTroconsId);

    if (!updatedDonneTrocons) {
      return res.status(404).json({ error: 'DonneTrocons not found' });
    }

    await updatedDonneTrocons.update(req.body);

    res.status(200).json(updatedDonneTrocons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete a DonneTrocons by ID
exports.deleteDonneTrocons = async (req, res) => {
  const donneTroconsId = req.params.id;

  try {
    const deletedDonneTrocons = await DonneTrocons.findByPk(donneTroconsId);

    if (!deletedDonneTrocons) {
      return res.status(404).json({ error: 'DonneTrocons not found' });
    }

    await deletedDonneTrocons.destroy();

    res.status(200).json({ message: 'DonneTrocons deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
