// UsersRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserControllers');
const authMiddleware = require('../authMiddleware/auth');

// Create a new user (accessible to all authenticated users)
router.post('/users', userController.createUser);

// Get all users (accessible to all authenticated users)
router.get('/users', userController.getUsers);

// Get a specific user by ID (accessible to all authenticated users)
router.get('/users/:id', userController.getUserById);

// Update a user by ID (accessible only to users with the 'admin' role)
router.put('/users/:id', userController.updateUser);

// Delete a user by ID (accessible only to users with the 'admin' role)
router.delete('/users/:id', userController.deleteUser);

// New login route
router.post('/login', userController.login);

module.exports = router;
