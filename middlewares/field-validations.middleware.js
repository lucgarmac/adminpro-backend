const {response} = require('express');
const expressValidator = require('express-validator');

const fieldValidations = (req, res = response, next) => {
    //Catch express-validations errors
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
        });
    }

    next();
};

module.exports = {
    fieldValidations
};