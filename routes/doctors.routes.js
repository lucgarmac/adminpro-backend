/**
 * Route: /api/doctors
 */

 const express = require('express');
 const expressValidator = require('express-validator');
 const { fieldValidations } = require('../middlewares/field-validations.middleware');
 const { jwtValidation } = require('../middlewares/jwt-validations.middleware');

 // Define router
 const router = express.Router();
 // Get controller
 const doctorController = require('../controllers/doctors.controller');
 
 // Set routes
 router.get('/', 
    jwtValidation,
    doctorController.getDoctors);
router.get('/:uid', 
    jwtValidation,
    doctorController.getDoctor);
 router.post('/', [
    jwtValidation,
    expressValidator.check('name', 'The name field is mandatory').not().isEmpty(),
    expressValidator.check('hospital', 'The hospital field is invalid').isMongoId(),
    fieldValidations], doctorController.createDoctor);
 router.put('/:uid', [
    jwtValidation,
    expressValidator.check('name', 'The name field is mandatory').not().isEmpty(),
    fieldValidations] , doctorController.updateDoctor);
 router.delete('/:uid',
    jwtValidation,
    doctorController.deleteDoctor);
 module.exports = router;