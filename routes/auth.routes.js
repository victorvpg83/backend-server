const { Router } = require('express')
const { login } = require('../controllers/auth.controller')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
 
const router = Router()


// Path: api/login

router.post( '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validateFields
    ],
    login
)




module.exports = router

