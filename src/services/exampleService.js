// src/services/exampleService.js
const db = require('../db');
const logger = require('../utils/logger');

/**
 * Get all examples from the database
 */
exports.getAllExamples = async () => {
  try {
    const result = await db.query('SELECT * FROM examples ORDER BY created_at DESC');
    return result.rows;
  } catch (err) {
    logger.error('Error getting examples:', err);
    throw new Error('Failed to get examples');
  }
};

/**
 * Get example by ID
 */
exports.getExampleById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM examples WHERE id = $1', [id]);
    return result.rows[0] || null;
  } catch (err) {
    logger.error(`Error getting example with id ${id}:`, err);
    throw new Error(`Failed to get example with id ${id}`);
  }
};

/**
 * Create a new example
 */
exports.createExample = async (data) => {
  const { name, description } = data;
  try {
    const result = await db.query(
      'INSERT INTO examples (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    return result.rows[0];
  } catch (err) {
    logger.error('Error creating example:', err);
    throw new Error('Failed to create example');
  }
};

/**
 * Update an existing example
 */
exports.updateExample = async (id, data) => {
  const { name, description } = data;
  try {
    const result = await db.query(
      'UPDATE examples SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    return result.rows[0] || null;
  } catch (err) {
    logger.error(`Error updating example with id ${id}:`, err);
    throw new Error(`Failed to update example with id ${id}`);
  }
};

/**
 * Delete an example
 */
exports.deleteExample = async (id) => {
  try {
    const result = await db.query('DELETE FROM examples WHERE id = $1 RETURNING id', [id]);
    return result.rowCount > 0;
  } catch (err) {
    logger.error(`Error deleting example with id ${id}:`, err);
    throw new Error(`Failed to delete example with id ${id}`);
  }
};