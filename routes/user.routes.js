const { Router } = require('express')
const { check } = require('express-validator') 
const { validateFields } = require('../middlewares/validate-fields')

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user.controller')
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

// Route /api/users

// Obtain all Users
router.get( '/', validateJWT, getUsers )
// Create user
router.post(
    '/', 
    [
        check('name', 'El nombre esobligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatirio').isEmail(),
        validateFields
    ], 
    createUser )

// Update user
router.put( 
    '/:id',
    [
        validateJWT,
        check('name', 'El nombre esobligatorio').not().isEmpty(),
        check('email', 'El email es obligatirio').isEmail(),
        check('role', 'El role es obligatirio').not().isEmpty(),
        validateFields,
    ],
    updateUser )

// Delete user
router.delete( '/:id',[
    validateJWT
], deleteUser )


module.exports = router