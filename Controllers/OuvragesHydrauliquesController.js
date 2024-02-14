const OuvragesHydrauliques = require('../model/OuvragesHydrauliques');
const Projets = require('../model/Projet');
const CodeStandard = require('../model/CodeStandard');
const OuvragesHydrauliquesEtats = require('../model/OuvragesHydrauliquesEtats');

// Function to create a new OuvragesHydrauliques
exports.createOuvragesHydrauliques = async (req, res) => {
  try {
    const { projetId, numeroLigne, typeId, coordonneesX, coordonneesY, etatIds } = req.body;

    // Create the OuvragesHydrauliques instance
    const newOuvragesHydrauliques = await OuvragesHydrauliques.create({
      projetId,
      numeroLigne,
      typeId,
      coordonneesX,
      coordonneesY
    });

    // Associate the specified etatIds with the newly created OuvragesHydrauliques
    await Promise.all(etatIds.map(async (codeStandardId) => {
      await OuvragesHydrauliquesEtats.create({ 
        ouvragesHydrauliquesId: newOuvragesHydrauliques.id, 
        codeStandardId 
      });
    }));

    res.status(201).json(newOuvragesHydrauliques);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get OuvragesHydrauliques by project ID
exports.getOuvragesHydrauliquesByProjetId = async (req, res) => {
  const projetId = req.params.id;

  try {
    const ouvragesHydrauliques = await OuvragesHydrauliques.findAll({ 
      where: { projetId },
      include: [
        { model: CodeStandard, as: 'type' },
        { model: OuvragesHydrauliquesEtats, as: 'ouvragesHydrauliques_etats', 
        include: [{ model: CodeStandard }] } // Ensure alias matches the association
      ]
    });

    if (!ouvragesHydrauliques || ouvragesHydrauliques.length === 0) {
      return res.status(404).json({ error: 'Ouvrages Hydrauliques not found for the specified project ID' });
    }

    res.status(200).json(ouvragesHydrauliques);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get a single OuvragesHydrauliques by ID
exports.getOuvragesHydrauliquesById = async (req, res) => {
  const ouvragesHydrauliquesId = req.params.id;

  try {
    const ouvragesHydrauliques = await OuvragesHydrauliques.findByPk(ouvragesHydrauliquesId, {
      include: [
        { model: Projets },
        { model: CodeStandard, as: 'type' },
        { model: CodeStandard, as: 'etat' }
      ]
    });

    if (!ouvragesHydrauliques) {
      return res.status(404).json({ error: 'Ouvrages Hydrauliques not found' });
    }

    res.status(200).json(ouvragesHydrauliques);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to update an OuvragesHydrauliques by ID
// exports.updateOuvragesHydrauliques = async (req, res) => {
//   const ouvragesHydrauliquesId = req.params.id;

//   try {
//     const updatedOuvragesHydrauliques = await OuvragesHydrauliques.findByPk(ouvragesHydrauliquesId,{
//       include: [
//         { model: OuvragesHydrauliquesEtats, as: 'ouvragesHydrauliques_etats'} 
//       ]
//     });

//     if (!updatedOuvragesHydrauliques) {
//       return res.status(404).json({ error: 'Ouvrages Hydrauliques not found' });
//     }

//     await updatedOuvragesHydrauliques.update(req.body,
//       {
//           include: [ { model: OuvragesHydrauliquesEtats, as: 'ouvragesHydrauliques_etats'} ]
//       });

//     res.status(200).json(updatedOuvragesHydrauliques);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



// Function to create a new OuvragesHydrauliques
exports.updateOuvragesHydrauliques = async (req, res) => {
    const ouvragesHydrauliquesId = req.params.id;
  try {
    const updatedOuvragesHydrauliques = await OuvragesHydrauliques.findByPk(ouvragesHydrauliquesId);

    if (!updatedOuvragesHydrauliques) {
      return res.status(404).json({ error: 'Ouvrages Hydrauliques not found' });
    }

    await updatedOuvragesHydrauliques.update(req.body);

    OuvragesHydrauliquesEtats.destroy({where : { ouvragesHydrauliquesId : ouvragesHydrauliquesId }})
    // Associate the specified etatIds with the newly created OuvragesHydrauliques
    await Promise.all(req.body.etatIds.map(async (codeStandardId) => {
      await OuvragesHydrauliquesEtats.create({ 
        ouvragesHydrauliquesId: ouvragesHydrauliquesId, 
        codeStandardId : codeStandardId 
      });
    }));

    res.status(201).json({message :'updated with succed'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// Function to delete an OuvragesHydrauliques by ID
exports.deleteOuvragesHydrauliques = async (req, res) => {
  const ouvragesHydrauliquesId = req.params.id;

  try {
    // Fetching related OuvragesHydrauliquesEtats before deleting the OuvragesHydrauliques
    const deletedOuvragesHydrauliques = await OuvragesHydrauliques.findByPk(ouvragesHydrauliquesId, {
      include: [{ model: OuvragesHydrauliquesEtats }]
    });

    if (!deletedOuvragesHydrauliques) {
      return res.status(404).json({ error: 'Ouvrages Hydrauliques not found' });
    }

    // Deleting associated OuvragesHydrauliquesEtats
    await deletedOuvragesHydrauliques.destroy();

    res.status(200).json({ message: 'Ouvrages Hydrauliques and associated records deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
