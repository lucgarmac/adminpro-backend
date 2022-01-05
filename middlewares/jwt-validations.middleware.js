const jsonwebtoken = require("jsonwebtoken");

const jwtValidation = (req, res, next) => {

    const token = req.header('token');

    if(!token) {
        return res.status(401).json({
            msg: 'Invalid token!!'
        });
    }

    try {
        const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.userUid = data.userUid;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Invalid token!!'
        });
    }
    
};

module.exports = {
    jwtValidation
}