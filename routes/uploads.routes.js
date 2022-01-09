/**
 * Route: /api/upload
 */

 const express = require('express');
 const fileUpload = require('express-fileupload');
 const { jwtValidation } = require('../middlewares/jwt-validations.middleware');

 // Define router
 const router = express.Router();
 // Get controller
 const uploadsController = require('../controllers/uploads.controller');
 // Init file upload
router.use(fileUpload());
 
 // Set routes
 router.patch('/:entity/:id', jwtValidation , uploadsController.uploadFile);
 router.get('/:entity/:img' , uploadsController.showImage);
 module.exports = router;

 
