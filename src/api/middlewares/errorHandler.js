const logger = require('../../utils/logger');
const config = require('../../config')
module.exports = (err, req, res, next) => {
  // Log the error
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Send response
  res.status(statusCode).json({
    status: 'error',
    message: config.env === 'production' ? 'Internal server error' : err.message,
    ...(config.env === 'development' && { stack: err.stack }),
  });
};