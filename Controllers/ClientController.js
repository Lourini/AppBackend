const Client = require('../model/Client');
const ZoneEtude = require('../model/ZoneEtude');
const db = require('../Config/db'); // Import db instance
const TypeOfConstruction = require('../model/TypeOfConstruction');

exports.createClient = async (req, res) => {
  let transaction;
  try {
    transaction = await db.transaction();

    // Destructure client and zoneEtude from the request body
    
    // Create Client
    const newClient = await Client.create(req.body.client, { transaction });

    // Create ZoneEtude
    const newZoneEtude = await ZoneEtude.create(
      { ...req.body.zoneEtude, clientId: newClient.id },
      { transaction }
    );

    // Create TypeOfConstruction entries
    const typeOfConstructionData = req.body.typeOfConstruction.map(item => ({
      ...item,
      zoneEtudeId: newZoneEtude.id
    }));
    const newTypeOfConstruction = await TypeOfConstruction.bulkCreate(typeOfConstructionData, { transaction });

    // Commit the transaction
    await transaction.commit();

    // Attach zoneEtude and typeOfConstruction to newClient for response

    res.status(201).json({ "client" : newClient,"zoneEtude" : newZoneEtude,"typeOfConstruction":newTypeOfConstruction });
  } catch (error) {
    if (transaction) await transaction.rollback();

    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateClient = async (req, res) => {
  let transaction;
  const clientId = req.params.id;

  try {
    transaction = await db.transaction();

    // Find the client to update
    const updatedClient = await Client.findByPk(clientId, { transaction });

    if (!updatedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Update ZoneEtude
    await ZoneEtude.update(req.body.zoneEtude, { where: { clientId: clientId }, transaction });

    // Update TypeOfConstruction
    // You need to loop through each TypeOfConstruction entry and update them individually
    for (const typeOfConstruction of req.body.typeOfConstruction) {
      await TypeOfConstruction.update(typeOfConstruction, { where: { id: typeOfConstruction.id }, transaction });
    }

    // Update Client
    await updatedClient.update(req.body.client, { transaction });

    // Commit the transaction
    await transaction.commit();

    res.status(200).json({message :"client modifier avec success"});
  } catch (error) {
    if (transaction) await transaction.rollback();

    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Function to delete a client by ID
exports.deleteClient = async (req, res) => {
  const clientId = req.params.id;

  try {
    const deletedClient = await Client.findByPk(clientId);

    if (!deletedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    await deletedClient.destroy();

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get all clients without including ZoneEtude and TypeOfConstruction
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get a single client by ID along with ZoneEtude and TypeOfConstruction
exports.getClient = async (req, res) => {
  const clientId = req.params.id;

  try {
    const client = await Client.findByPk(clientId, {
      include: [
        { model: ZoneEtude, include: [TypeOfConstruction] }
      ]
    });

  
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    const zoneEtude = await ZoneEtude.findOne({where:{clientId:clientId}});
    if (!zoneEtude) {
      return res.status(404).json({ error: 'Zone Etude not found' });
    }
    const typeOfConstruction = await TypeOfConstruction.findAll({where : {zoneEtudeId :zoneEtude.id}});
    res.status(200).json({client : client,zoneEtude :zoneEtude , typeOfConstruction :typeOfConstruction});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


