// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./Config/db'); // Adjust the path based on your project structure
const usersRoutes = require('./Routes/UsersRoutes');
const authMiddleware = require('./authMiddleware/auth');

const app = express();

// Connect to the database
db.sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use routes
app.use('/api', usersRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
