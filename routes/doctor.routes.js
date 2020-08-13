const { Router } = require('express')
const { check } = require('express-validator') 
const { validateFields } = require('../middlewares/validate-fields')

const { validateJWT } = require('../middlewares/validate-jwt')

const { getDoctors, updateDoctor, deleteDoctor, createDoctor, getDoctorById } = require('../controllers/doctor.controller')

const router = Router()

// Route /api/doctor

// Obtain all Users
router.get( '/',validateJWT, getDoctors )

// Create user
router.post(
    '/', 
    [
        validateJWT,
        check('name', 'El nombre del médico es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validateFields
    ], 
    createDoctor )

// Update user
router.put( 
    '/:id',
    [
        validateJWT,
        check('name', 'El nombre del médico es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validateFields
    ],
    updateDoctor )

// Delete user
router.delete( '/:id', validateJWT, deleteDoctor )

// get one doctor by id
router.get( '/:id', validateJWT, getDoctorById )


module.exports = router