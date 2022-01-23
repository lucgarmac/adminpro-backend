const jsonwebtoken = require("jsonwebtoken");
const User = require('../models/user.model');

const jwtValidation = (req, res, next) => {

    const token = req.header('token');

    if(!token) {
        return res.status(401).json({
            msg: 'Invalid token!!'
        });
    }

    try {
        const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        // add userUid in request.
        req.userUid = data.userUid;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Invalid token!!'
        });
    }
    
};

const adminRoleValidation = async (req, res, next) => {

    const uid = req.userUid;
    const uidToUpdate = req.params.uid;

    try {
        
        const userFound = await User.findById(uid);
        if(userFound && uidToUpdate !== uid && userFound.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                msg: 'The operation is unautorized!'
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Invalid role!!'
        });
    }
};


module.exports = {
    jwtValidation,
    adminRoleValidation
};