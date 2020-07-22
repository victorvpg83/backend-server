const { response } = require('express')

const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { genJwt } = require('../helpers/jwt')

const login = async ( req, res = response ) => {

    const { email, password } = req.body

    try {

        const userDB = await User.findOne({ email })

        // Verifiy email
        if ( !userDB ) {
            res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // Verify password

        const validPassword = bcrypt.compareSync( password, userDB.password )

        if ( !validPassword ) {
            res.status(404).json({
                ok: false,
                msj: 'Contraseña no válida'
            })
        }


        // Generate Token
        const token = await genJwt( userDB.id )

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })
    }
}


module.exports = {
    login
}