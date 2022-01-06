/**
 * Route: /api/hospitals
 */

 const express = require('express');
 const expressValidator = require('express-validator');
 const { fieldValidations } = require('../middlewares/field-validations.middleware');
 const { jwtValidation } = require('../middlewares/jwt-validations.middleware');

 // Define router
 const router = express.Router();
 // Get controller
 const hospitalController = require('../controllers/hospitals.controller');
 
 // Set routes
 router.get('/', 
    jwtValidation ,
    hospitalController.getHospitals);
 router.post('/', [
    jwtValidation,
    expressValidator.check('name', 'The name field is mandatory').not().isEmpty(),
    fieldValidations], hospitalController.createHospital);
 router.put('/:id', [
    jwtValidation,
    expressValidator.check('name', 'The name field is mandatory').not().isEmpty(),
    fieldValidations] , hospitalController.updateHospital);
 router.delete('/:id', 
    jwtValidation,
    hospitalController.deleteHospital);
 module.exports = router;