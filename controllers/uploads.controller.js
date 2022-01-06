const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const { updateImg } = require('../helpers/update-img.helper');


const uploadFile = async(req, res) => {
    const entityCriteria = req.params.entity;
    const idEntity = req.params.id;

    // Validate entityCriteria
    if(entityCriteria !== 'users' && entityCriteria !== 'hospitals' && entityCriteria !== 'doctors') {
        return res.status(400).json({
            msg: 'Malformed entity - Values allowed: users, hospitals and doctors'
        });
    }

    // Validate if exists file
    if (!req.files || Object.keys(req.files).length === 0 || (req.files && req.files.length && !req.files.img)) {
        return res.status(400).json({
            msg:'No files were uploaded!!'
        });
    }

    const file = req.files.img;
    const fileSplited = file.name.split('.');
    const extFile = fileSplited[fileSplited.length -1];

    // Validate ext file
    const extFilesAllowed = ['png', 'jpeg', 'jpg', 'gif'];
    if(!extFilesAllowed.includes(extFile)) {
        return res.status(400).json({
            msg:'Ext file not allowed!!'
        });
    }

    // Generate new filename
    const newFilename = `${uuidv4()}.${extFile}`;
    // Generate path file
    const path = `uploads/${entityCriteria}/${newFilename}`;
    // Move file to directory
    file.mv(path, async (err) => {
        if(err) {
            return res.status(500).json({
                msg: 'An error has ocurred when upload file'
            });
        }

        // Update DB
        const result = await updateImg(entityCriteria, idEntity, newFilename);
        if(result.errorCode) {
            return res.status(result.errorCode).json({
                msg: result.msg
            });
        }
        

        return res.json({
            ok: true,
            [entityCriteria.substring(0, entityCriteria.lastIndexOf('s'))]: result
        });
    });
};

const showImage = (req, res) => {
    const entityCriteria = req.params.entity;
    const image = req.params.img;

   // Validate entityCriteria
   if(entityCriteria !== 'users' && entityCriteria !== 'hospitals' && entityCriteria !== 'doctors') {
        return res.status(400).json({
            msg: 'Malformed entity - Values allowed: users, hospitals and doctors'
        });
    }

    let pathImg = path.join(__dirname, `../uploads/${entityCriteria}/${image}`);

    if(!fs.existsSync(pathImg)) {
        pathImg = path.join(__dirname, '../uploads/noimage.png');
    }

    return res.sendFile(pathImg);
};


module.exports = {
    uploadFile,
    showImage
};