const { Router } = require('express')
const { check } = require('express-validator') 
const { validateFields } = require('../middlewares/validate-fields')

const { validateJWT } = require('../middlewares/validate-jwt')

const { getHospitals, updateHospital, deleteHospital,createHospital } = require('../controllers/hospital.controller')

const router = Router()

// Route /api/hospitals

// Obtain all Users
router.get( '/', getHospitals )

// Create user
router.post(
    '/', 
    [
        validateJWT,
        check( 'name', 'El nombre del hospital es necesario' ).not().isEmpty(),
        validateFields
    ], 
    createHospital )

// Update user
router.put( 
    '/:id',
    [

    ],
    updateHospital )

// Delete user
router.delete( 
    '/:id',
    [

    ], 
    deleteHospital )


module.exports = router


