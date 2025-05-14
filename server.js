const app = require('./src/app');
const config = require('./src/config');
const logger = require('./src/utils/logger');
const db = require('./src/db');

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Connect to database
db.connect()
  .then(() => {
    // Start the server
    const server = app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port} in ${config.env} mode`);
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        logger.info('HTTP server closed');
        db.disconnect()
          .then(() => {
            logger.info('Database connection closed');
            process.exit(0);
          })
          .catch((err) => {
            logger.error('Error disconnecting from database:', err);
            process.exit(1);
          });
      });
    });
  })
  .catch((err) => {
    logger.error('Failed to connect to database:', err);
    process.exit(1);
  });