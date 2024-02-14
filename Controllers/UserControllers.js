// UserControllers.js
const User = require('../model/User');
const bcrypt = require('bcrypt');
const authMiddleware = require('../authMiddleware/auth');

// Function to create a new user
exports.createUser = async (req, res) => {
  try {
    const { ...userData } = req.body;
    const newUser = await User.create({ ...userData});
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get a single user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to update a user by ID
exports.updateUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const {...userData } = req.body;

    // Check if a new password is provided
    // if (password) {
    //   const hashedPassword = await bcrypt.hash(password, 10);
    //   userData.password = hashedPassword;
    // }

    const [updatedRowsCount] = await User.update(userData, {
      where: { id: userId },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete a user by ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedRowCount = await User.destroy({
      where: { id: userId },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//Function Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const { password: excludedPassword, ...userData } = user.toJSON();

    const token = authMiddleware.createToken(userData);
    
    // Set cookie expiration to 4 hours from now (in milliseconds)
    const maxAge = 4 * 60 * 60 * 1000;

    res.cookie('token', token, { httpOnly: true, maxAge }); // Set expiration time for the cookie
    
    res.status(200).json({ user: userData,token: token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




