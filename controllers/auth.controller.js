const {response} = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt.helper');

const login = async(req, res=response) => {

    const {email, password} = req.body;

    try {
        
        const userFound = await User.findOne({email});
        if(!userFound) {
            return res.status(404).json({
                msg: 'Email not found!!'
            });
        }

        const isValidPassword = bcrypt.compareSync(password, userFound.password);
        if(!isValidPassword) {
            return res.status(400).json({
                msg: 'Invalid password!!'
            });
        }

        // Generate JWT
        const token = await generateJWT(userFound.id);
        
        return res.json({
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'An error has ocurred when loggin in. Please, contact with the admin'
        })
    }
};

module.exports = {
    login
};