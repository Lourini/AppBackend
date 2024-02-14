const Projet = require('../model/Projet');

// Function to create a new projet
exports.createProjet = async (req, res) => {
  try {
    const newProjet = await Projet.create(req.body);
    res.status(201).json(newProjet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get all projets
exports.getProjets = async (req, res) => {
  try {
    const projets = await Projet.findAll();
    res.status(200).json(projets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get a single projet by ID
exports.getProjetById = async (req, res) => {
  const projetId = req.params.id;

  try {
    const projet = await Projet.findByPk(projetId);

    if (!projet) {
      return res.status(404).json({ error: 'Projet not found' });
    }

    res.status(200).json(projet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to update a projet by ID
exports.updateProjet = async (req, res) => {
  const projetId = req.params.id;

  try {
    const updatedProjet = await Projet.findByPk(projetId);

    if (!updatedProjet) {
      return res.status(404).json({ error: 'Projet not found' });
    }

    await updatedProjet.update(req.body);

    res.status(200).json(updatedProjet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete a projet by ID
exports.deleteProjet = async (req, res) => {
  const projetId = req.params.id;

  try {
    const deletedProjet = await Projet.findByPk(projetId);

    if (!deletedProjet) {
      return res.status(404).json({ error: 'Projet not found' });
    }

    await deletedProjet.destroy();

    res.status(200).json({ message: 'Projet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Function to get projets by clientId
exports.getProjetsByClientId = async (req, res) => {
  const clientId = req.params.clientId;

  try {
    const projets = await Projet.findAll({
      where: {
        clientId: clientId
      }
    });

    if (!projets || projets.length === 0) {
      return res.status(404).json({ error: 'No projects found for the specified client' });
    }

    res.status(200).json(projets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
