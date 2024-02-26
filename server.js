// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./Config/db'); // Adjust the path based on your project structure
const usersRoutes = require('./Routes/UsersRoutes');
const clientRoutes = require('./Routes/ClientRoutes');
const amenagementRoutes = require('./Routes/AmenagementsProposesRoutes');
const anomaliesRoutes = require('./Routes/AnomalieRoutes');
const codestandardRoutes = require('./Routes/CodeStandardRoutes');
const donnestroconsRoutes = require('./Routes/DonnesTroconsRoutes');
const ouvragehydrauliquesRoutes = require('./Routes/OuvragesHydrauliquesRoutes');
const projetRoutes = require('./Routes/ProjetRoutes');
const taskRoutes = require('./Routes/TaskRoutes');
const eventRoutes = require('./Routes/EventRoutes')
const authMiddleware = require('./authMiddleware/auth');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:4200'
}));

// Connect to the database
db.sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Middleware to parse JSON requests

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());

app.use(bodyParser.json({limit: '50mb'}));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000,
  }),
);

// Use routes
app.use('/api', usersRoutes);
app.use('/api', clientRoutes);
app.use('/api',amenagementRoutes);
app.use('/api',anomaliesRoutes);
app.use('/api',codestandardRoutes);
app.use('/api',donnestroconsRoutes);
app.use('/api',ouvragehydrauliquesRoutes);
app.use('/api',projetRoutes);
app.use('/api',taskRoutes);
app.use('/api',eventRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
