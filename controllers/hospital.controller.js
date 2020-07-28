const { response } = require('express')

const Hospital = require('../models/hospital')

const getHospitals = async ( req, res = response ) => {

    const hospitals = await Hospital.find()
                                    .populate('user', 'name img')

    res.json({
        ok: true,
        hospitals
    })
}

const createHospital = async ( req, res = response ) => {

    const uid = req.uid
    const hospital = new Hospital( { 
        user: uid,
        ...req.body 
    } )

    try {

        const hospitalDB = await hospital.save()

        res.json({
            ok: true,
            hospital: hospitalDB
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msj: 'Hable con el administrador'
        })
    }


}

const updateHospital = async ( req, res = response ) => {

    const hospitalId = req.params.id
    const uid = req.uid

    try {

        const hospitalDB = await Hospital.findById( hospitalId )

        if( !hospitalDB ) {

            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id',
            })
        }

        const hospitalChanges = {
            ...req.body,
            user: uid
        }

        const updatedHospital = await Hospital.findByIdAndUpdate( hospitalId, hospitalChanges, { new: true } )


        res.json({
            ok: true,
            hospital: updatedHospital
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar el hospital'
        })
    }


}

const deleteHospital = async ( req, res = response ) => {

    const hospitalId = req.params.id

    try {

        const hospitalDB = await Hospital.findById( hospitalId )

        if( !hospitalDB ) {

            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id',
            })
        }

        await Hospital.findByIdAndDelete( hospitalId )

        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar el hospital'
        })
    }
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}