const logger = require('../../utils/logger');

module.exports = (req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`, {
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip,
  });
  next();
};