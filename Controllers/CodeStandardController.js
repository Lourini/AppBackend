const CodeStandard = require('../model/CodeStandard');

// Function to create a new code standard
exports.createCodeStandard = async (req, res) => {
  try {
    const newCodeStandard = await CodeStandard.create(req.body);
    res.status(201).json(newCodeStandard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get all code standards
exports.getAllCodeStandards = async (req, res) => {
  try {
    const codeStandards = await CodeStandard.findAll();
    res.status(200).json(codeStandards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get a single code standard by ID
exports.getCodeStandardById = async (req, res) => {
  const codeStandardId = req.params.id;

  try {
    const codeStandard = await CodeStandard.findByPk(codeStandardId);

    if (!codeStandard) {
      return res.status(404).json({ error: 'Code Standard not found' });
    }

    res.status(200).json(codeStandard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get code standards by type
exports.getCodeStandardByType = async (req, res) => {
  const type = req.params.type;

  try {
    const codeStandards = await CodeStandard.findAll({ where: { type } });

    if (!codeStandards || codeStandards.length === 0) {
      return res.status(404).json({ error: 'Code Standards not found for the specified type' });
    }

    res.status(200).json(codeStandards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to update a code standard by ID
exports.updateCodeStandard = async (req, res) => {
  const codeStandardId = req.params.id;

  try {
    const updatedCodeStandard = await CodeStandard.findByPk(codeStandardId);

    if (!updatedCodeStandard) {
      return res.status(404).json({ error: 'Code Standard not found' });
    }

    await updatedCodeStandard.update(req.body);

    res.status(200).json(updatedCodeStandard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete a code standard by ID
exports.deleteCodeStandard = async (req, res) => {
  const codeStandardId = req.params.id;

  try {
    const deletedCodeStandard = await CodeStandard.findByPk(codeStandardId);

    if (!deletedCodeStandard) {
      return res.status(404).json({ error: 'Code Standard not found' });
    }

    await deletedCodeStandard.destroy();

    res.status(200).json({ message: 'Code Standard deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
