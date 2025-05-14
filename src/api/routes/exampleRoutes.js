// src/api/routes/exampleRoutes.js
const express = require('express');
const exampleController = require('../controllers/exampleController');

const router = express.Router();

router
  .route('/')
  .get(exampleController.getAllExamples)
  .post(exampleController.createExample);

router
  .route('/:id')
  .get(exampleController.getExampleById)
  .put(exampleController.updateExample)
  .delete(exampleController.deleteExample);

module.exports = router;
