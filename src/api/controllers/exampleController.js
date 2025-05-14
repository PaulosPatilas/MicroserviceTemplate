const exampleService = require('../../services/exampleService');
const logger = require('../../utils/logger');

/**
 * Get all examples
 */
exports.getAllExamples = async (req, res, next) => {
  try {
    logger.debug('Getting all examples');
    const examples = await exampleService.getAllExamples();
    res.status(200).json({
      status: 'success',
      results: examples.length,
      data: examples,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get example by ID
 */
exports.getExampleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    logger.debug(`Getting example with id: ${id}`);
    const example = await exampleService.getExampleById(id);
    
    if (!example) {
      return res.status(404).json({
        status: 'fail',
        message: `Example with ID ${id} not found`,
      });
    }

    res.status(200).json({
      status: 'success',
      data: example,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Create new example
 */
exports.createExample = async (req, res, next) => {
  try {
    logger.debug('Creating new example', req.body);
    const newExample = await exampleService.createExample(req.body);
    res.status(201).json({
      status: 'success',
      data: newExample,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update example
 */
exports.updateExample = async (req, res, next) => {
  try {
    const { id } = req.params;
    logger.debug(`Updating example with id: ${id}`, req.body);
    const updatedExample = await exampleService.updateExample(id, req.body);
    
    if (!updatedExample) {
      return res.status(404).json({
        status: 'fail',
        message: `Example with ID ${id} not found`,
      });
    }

    res.status(200).json({
      status: 'success',
      data: updatedExample,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete example
 */
exports.deleteExample = async (req, res, next) => {
  try {
    const { id } = req.params;
    logger.debug(`Deleting example with id: ${id}`);
    const success = await exampleService.deleteExample(id);
    
    if (!success) {
      return res.status(404).json({
        status: 'fail',
        message: `Example with ID ${id} not found`,
      });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};