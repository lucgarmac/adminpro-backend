const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctor.model');

const getDataEntityByName = async(req, res) => {
    
    const criteria = new RegExp(req.params.name, 'i');

    // Exec searchs simultaneously
    const [users, hospitals, doctors] = await Promise.all([
        User.find({name: criteria}),
        Hospital.find({name: criteria}),
        Doctor.find({name: criteria})
    ]);


    return res.json({
        users,
        hospitals,
        doctors
    });
};

const getDataByEntityAndName = async(req, res) => {
    
    const entityCriteria = req.params.entity;
    const criteria = new RegExp(req.params.name, 'i');

    let result = null;
    switch(entityCriteria) {
        case 'users':
            result = await User.find({name: criteria}, 'name email role google');
            break;
        case 'hospitals':
            result = await Hospital.find({name: criteria})
                .populate('user', 'name img');
            break;
        case 'doctors':
            result = await Doctor.find({name: criteria})
                .populate('user', 'name')
                .populate('hospital', 'name');
            break;
        default:
            return res.status(400).json({
                msg: 'Malformed entity - Values allowed: users, hospitals and doctors'
            });
    }

    return res.json({
        [entityCriteria]: result
    });
};


module.exports = {
    getDataEntityByName,
    getDataByEntityAndName
};