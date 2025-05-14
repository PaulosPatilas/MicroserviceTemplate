const config = require('../config');
const logger = require('../utils/logger');

// Access pool from config
const pool = config.pool;

// Test the connection on startup
const connect = async () => {
  try {
    const client = await pool.connect();
    logger.info('Connected to database successfully');
    client.release();
    return true;
  } catch (err) {
    logger.error('Database connection error:', err);
    throw err;
  }
};

// Gracefully close the pool
const disconnect = async () => {
  try {
    await pool.end();
    logger.info('Database pool closed');
    return true;
  } catch (err) {
    logger.error('Error closing database pool:', err);
    throw err;
  }
};

// Query helper function
const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  logger.debug('Executed query', { text, duration, rows: res.rowCount });
  return res;
};

module.exports = {
  connect,
  disconnect,
  query,
  pool,
};