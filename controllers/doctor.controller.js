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

const updateDoctor = async ( req, res = response ) => {
    
    const doctorId = req.params.id
    const uid = req.uid

    try {

        const doctorDB = await Doctor.findById( doctorId )

        if( !doctorDB ) {

            return res.status(404).json({
                ok: false,
                msg: 'No existe un médico con ese id',
            })
        }

        const doctorChanges = {
            ...req.body,
            user: uid
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate( doctorId, doctorChanges, { new: true } )


        res.json({
            ok: true,
            doctor: updatedDoctor
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar el médico'
        })
    }
}

const deleteDoctor = async ( req, res = response ) => {
    
    const doctorId = req.params.id

    try {

        const doctorDB = await Doctor.findById( doctorId )

        if( !doctorDB ) {

            return res.status(404).json({
                ok: false,
                msg: 'No existe un médico con ese id',
            })
        }

        await Doctor.findByIdAndDelete( doctorId )

        res.json({
            ok: true,
            msg: 'Médico eliminado'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar el médico'
        })
    }
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}