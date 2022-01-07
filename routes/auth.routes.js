/**
 * Route: /api/login
 */

const express = require('express');
const expressValidator = require('express-validator');
const { fieldValidations } = require('../middlewares/field-validations.middleware');

// Define router
const router = express.Router();
// Get controller
const authController = require('../controllers/auth.controller');
const { jwtValidation } = require('../middlewares/jwt-validations.middleware');

// Set routes
router.post('/', [
    expressValidator.check('email', 'The email field is mandatory').isEmail(),
    expressValidator.check('password', 'The password field is mandatory').not().isEmpty(),
    fieldValidations
] , authController.login);

router.post('/google', [
    expressValidator.check('token', 'The token field is mandatory').not().isEmpty(),
    fieldValidations
] , authController.loginGoogle);

router.get('/renew', [
    jwtValidation
] , authController.renewToken);


module.exports = router;