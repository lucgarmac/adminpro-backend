const {response} = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt.helper');

const getUsers = async(req, res) => {

    

    const users = await User.find({}, 'name email role google');
    return res.json({
        users,
        userUid: req.userUid
    })
};

const createUser = async(req, res = response) => {

    const { password, email } = req.body;

    try {
        const userFound = await User.findOne({email});
        if(userFound) {
            return res.status(400).json({
                msg: 'The field "Email" has been registered!!'
            });
        }

        const newUser = new User( req.body);

        // Encript password
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        await newUser.save();

        // Generate token
        const token = await generateJWT(newUser.id);

        return res.status(201).json({
            newUser,
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'An error has ocurred when the user creating'
        })
    }

    
};

const updateUser = async(req, res = response) => {
    const uid = req.params.uid;
    try {

        let userFound = await User.findById(uid);
        if(!userFound) {
            return res.status(404).json({
                msg: 'The user no exists!'
            });
        }

        // TODO: Validate token and verify if user is valid

        const {password, google, email, ...bodyFields} = req.body;
        if(userFound.email !== email) {
            userFound = await User.findOne({email});
            if(userFound) {
                return res.status(400).json({
                    msg: 'The user with this email exists!!'
                });
            }

        }
         
        // {new: true} - Get use updated. If remove this option, this operation get old user but in DB will be updated.
        const userUpdated = await User.findByIdAndUpdate(uid, bodyFields, { new: true });

        return res.status(200).json({
            userUpdated
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'An error has ocurred when the user updating'
        })
    }
};

const deleteUser = async(req, res= response) => {
    const uid = req.params.uid;
    
    try {
        const userFound = await User.findById(uid);
        if(!userFound) {
            return res.status(404).json({
                msg: 'The user no exists!'
            });
        }

        const userDeleted = await User.findByIdAndDelete(uid)
        return res.status(200).json({
            userDeleted
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'An error has ocurred when the user updating'
        });
    }
    
};


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};