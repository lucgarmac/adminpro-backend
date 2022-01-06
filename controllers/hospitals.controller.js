const {response} = require('express');
const Hospital = require('../models/hospital.model');

const getHospitals = async(req, res) => {
    const hospitals = await Hospital.find({}).populate('user', 'name img');
    return res.json({
        hospitals
    })
};

const createHospital = async(req, res = response) => {

    const { name } = req.body;

    try {
        const hospitalFound = await Hospital.findOne({name});
        if(hospitalFound) {
            return res.status(409).json({
                msg: 'The hospital exists yet!!'
            });
        }

        const newHospital = new Hospital( {
            user: req.userUid,
            ...req.body
        });

        await newHospital.save();

        return res.status(201).json({
            newHospital
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'An error has ocurred when the hospital creating'
        })
    }

    
};

const updateHospital = async(req, res = response) => {
    const id = req.params.id;
    try {

        let hospitalFound = await Hospital.findById(id);
        if(!hospitalFound) {
            return res.status(404).json({
                msg: 'The hospital no exists!'
            });
        }
         
        // {new: true} - Get use updated. If remove this option, this operation get old hospital but in DB will be updated.
        const { user, ...bodyFields} = req.body;
        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, bodyFields, { new: true });

        return res.status(200).json({
            hospitalUpdated
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'An error has ocurred when the hospital updating'
        })
    }
};

const deleteHospital = async(req, res= response) => {
    const id = req.params.id;
    
    try {
        const hospitalFound = await Hospital.findById(id);
        if(!hospitalFound) {
            return res.status(404).json({
                msg: 'The hospital no exists!'
            });
        }

        const hospitalDeleted = await Hospital.findByIdAndDelete(id)
        return res.status(200).json({
            hospitalDeleted
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'An error has ocurred when the hospital deleting'
        });
    }
    
};


module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
};