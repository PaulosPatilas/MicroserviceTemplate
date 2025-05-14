require('dotenv').config();
const { Pool } = require('pg');

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_NAME || 'aoc',
    user: process.env.DB_USER || 'aoc_user',
    password: process.env.DB_PASSWORD || 'aoc311#!!',
  },
  logLevel: process.env.LOG_LEVEL || 'info',
  pool: new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_NAME || 'aoc',
    user: process.env.DB_USER || 'aoc_user',
    password: process.env.DB_PASSWORD || 'aoc311#!!',
  })
};