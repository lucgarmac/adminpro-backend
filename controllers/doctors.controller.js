const {response} = require('express');
const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');

const getDoctors = async(req, res) => {
    const doctors = await Doctor.find({})
        .populate('user', 'name')
        .populate('hospital', 'name');
    return res.json({
        doctors
    })
};

const createDoctor = async(req, res = response) => {

    const { name, hospital } = req.body;

    try {
        const doctorFound = await Doctor.findOne({name});
        if(doctorFound) {
            return res.status(409).json({
                msg: 'The doctor exists yet!!'
            });
        }

        const hospitalFound = await Hospital.findById(hospital);
        if(!hospitalFound) {
            return res.status(404).json({
                msg: 'The hospital has not found!!'
            });
        }

        const newDoctor = new Doctor( {
            user: req.userUid,
            ...req.body
        });

        await newDoctor.save();

        return res.status(201).json({
            newDoctor
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'An error has ocurred when the doctor creating'
        })
    }

    
};

const updateDoctor = async(req, res = response) => {
    const uid = req.params.uid;
    try {

        let doctorFound = await Doctor.findById(uid);
        if(!doctorFound) {
            return res.status(404).json({
                msg: 'The doctor no exists!'
            });
        }
         
        // {new: true} - Get use updated. If remove this option, this operation get old doctor but in DB will be updated.
        const { user, hospital, ...bodyFields} = req.body;
        const doctorUpdated = await Doctor.findByIdAndUpdate(uid, bodyFields, { new: true });

        return res.status(200).json({
            doctorUpdated
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'An error has ocurred when the doctor updating'
        })
    }
};

const deleteDoctor = async(req, res= response) => {
    const uid = req.params.uid;
    
    try {
        const doctorFound = await Doctor.findById(uid);
        if(!doctorFound) {
            return res.status(404).json({
                msg: 'The doctor no exists!'
            });
        }

        const doctorDeleted = await Doctor.findByIdAndDelete(uid)
        return res.status(200).json({
            doctorDeleted
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'An error has ocurred when the doctor deleting'
        });
    }
    
};


module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
};