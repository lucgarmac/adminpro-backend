const {response} = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt.helper');
const { verifyGoogleToken } = require('../helpers/validate-google-token.helper');

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


const loginGoogle = async(req, res=response) => {
    const {token} = req.body;
    try {
        const data = await verifyGoogleToken(token);

        // Verify if user exists
        const userFound = await User.findOne({email: data.email});
        let userObj = null;
        if(!userFound) {
            // Create user
            userObj = new User({
                name: data.name,
                email: data.email,
                password: 'password',
                img: data.picture,
                google: true
            });
        } else {
            // User exists - Update user info
            userObj = userFound;
            userObj.google = true;
            userObj.password = 'password';
        }

        // Save DB
        await userObj.save();

        // Generate JWT
        const newToken = await generateJWT(userObj.id);
        
        return res.json({
            user: userObj,
            token: newToken
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'An error has ocurred when loggin in. Please, contact with the admin'
        })
    }
};

const renewToken = async(req, res = response) => {
    
    const userUid = req.userUid;
    // Generate JWT
    const token = await generateJWT(userUid);

    const userFound = await User.findById(userUid);
    if(!userFound) {
        return res.status(400).json({
            msg: 'Invalid token!!'
        });
    }

    return res.json({
        user: userFound,
        token
    });
};

module.exports = {
    login,
    loginGoogle,
    renewToken
};