const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const errorHandler = require('./api/middlewares/errorHandler');
const requestLogger = require('./api/middlewares/requestLogger');
const exampleRoutes = require('./api/routes/exampleRoutes');

const app = express();

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, './api/swagger/swagger.yaml'));

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // HTTP request logger
app.use(requestLogger); // Custom request logger

// Routes
app.use('/api/v1/examples', exampleRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handler middleware
app.use(errorHandler);

module.exports = app;