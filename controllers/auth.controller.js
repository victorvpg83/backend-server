const { response } = require('express')

const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { genJwt } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-verify')

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
                msg: 'Contraseña no válida'
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

const googleSignIn = async ( req, res = response ) => {

    const googleToken = req.body.token

    try {

        const { name, email, picture } = await googleVerify( googleToken )

        const userDB = await User.findOne({ email })
        let user

        if( !userDB ) {
            // User not exixt
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true

            })
        } else {
            user = userDB
            user.google = true
        }  
        
        // DB save
        await user.save()

        //GEN JWT
        const token = await genJwt( user.id )

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no válido',
        })
    }


}

const renewToken = async ( req, res = response ) => {

    const uid = req.uid

     //GEN JWT
     const token = await genJwt( uid )

     // get user
     const user = await User.findById( uid )

    res.json({
        ok: true,
        token,
        user
    })

}


module.exports = {
    login,
    googleSignIn,
    renewToken
}
