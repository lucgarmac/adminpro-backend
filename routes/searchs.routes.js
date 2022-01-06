/**
 * Route: /api/all
 */

 const express = require('express');
 const { jwtValidation } = require('../middlewares/jwt-validations.middleware');
 
 // Define router
 const router = express.Router();
 // Get controller
 const searchController = require('../controllers/searchs.controller');
 
 // Set routes
 router.get('/all/:name', jwtValidation , searchController.getDataEntityByName);
 router.get('/:entity/:name', jwtValidation , searchController.getDataByEntityAndName);
 module.exports = router;

 