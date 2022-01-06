const fs = require('fs');
const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctor.model');

const removeOldImage = (entityCriteria, entityImg) => {
    
    const oldPath = `uploads/${entityCriteria}/${entityImg}`;
    if(fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        return true;
    }

    return false;

};

const updateImg = async(entityCriteria, idEntity, newFilename) => {
    let entity = null;
    switch(entityCriteria) {
        case 'users':
            entity = User;
            break;
        case 'hospitals':
            entity = Hospital;
            break;
        case 'doctors':
            entity = Doctor;
            break;
        default:
            
    }
   
    const entityItemFound = await entity.findById(idEntity);
    if(!entityItemFound) {
        return {   
            errorCode: 404,
            msg: entityCriteria.substring(0, entityCriteria.lastIndexOf('s')) + ' not found!!'
        };
    }
    
    // Remove old physical image in entity item
    removeOldImage(entityCriteria, entityItemFound.img);
    
    // Update entity with the new image
    entityItemFound.img = newFilename;
    await entityItemFound.save();
    return entityItemFound;
};

module.exports = {
    updateImg
};