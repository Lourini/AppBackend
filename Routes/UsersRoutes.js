// UsersRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserControllers');
const authMiddleware = require('../authMiddleware/auth');

// Create a new user (accessible to all authenticated users)
router.post('/users', userController.createUser);

// Get all users (accessible to all authenticated users)
router.get('/users', authMiddleware.authenticateToken, userController.getUsers);

// Get a specific user by ID (accessible to all authenticated users)
router.get('/users/:id', authMiddleware.authenticateToken, userController.getUserById);

// Update a user by ID (accessible only to users with the 'admin' role)
router.put('/users/:id', authMiddleware.authenticateToken, authMiddleware.checkUserRole('admin'), userController.updateUser);

// Delete a user by ID (accessible only to users with the 'admin' role)
router.delete('/users/:id', authMiddleware.authenticateToken, authMiddleware.checkUserRole('admin'), userController.deleteUser);

// New login route
router.post('/login', userController.login);

module.exports = router;
