const { response } = require('express')

const Doctor = require('../models/doctor')

const getDoctors = async ( req, res = response ) => {

    const doctors = await Doctor.find()
                                .populate('user', 'name img')
                                .populate('hospital', 'name img')


    res.json({
        ok: true,
        doctors
    })
}

const createDoctor = async ( req, res = response ) => {

    const uid = req.uid
    const doctor = new Doctor({
        user: uid,
        ...req.body
    })

    try {

        const doctorDB = await doctor.save()
        
        res.json({
            ok: true,
            doctor: doctorDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msj: 'Consulte con el administrador'
        })
    }

}

const updateDoctor = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'updateDoctor'
    })
}

const deleteDoctor = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'deleteDoctor'
    })
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}