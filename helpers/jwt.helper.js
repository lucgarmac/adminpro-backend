const {sign} = require('jsonwebtoken');

const generateJWT = (userUid) => {
    

    return new Promise( (resolve, reject) => {
        const payload = {
            userUid
        };
    
        sign(payload, process.env.JWT_SECRET, 
            { expiresIn: '12h' }, 
            (error, token) => {
            if (error) {
                reject('An error has ocurred when JWT is generating');
            }
            
            resolve(token);
        });
    });
};

module.exports = {
    generateJWT
}