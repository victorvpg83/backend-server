const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = ( req, res, next ) =>{

    // Read token
    const token = req.header( 'x-token' )

    if ( !token ) {

        return res.status(401).json({
            ok: false,
            msj: 'No hay token en la petición'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET )
        req.uid = uid
        next()

    } catch (error) {

        return res.status(401).json({
            ok: true,
            msj: 'Token no válido'
        })
    }
}

const validateAdminRole = async( req, res, next ) => {

    const uid = req.uid

    try {

        const userDB = await User.findById( uid )

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No exite ningún usuario con ese ID'
            })
        }

        if ( userDB.role !== 'ADMIN_ROLE' ) {
            return res.status(403).json({
                ok: false,
                msg: 'No es un usuario administrativo'
            })
        }

        next()
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const validateAdminRole_or_sameUser = async( req, res, next ) => {

    const uid = req.uid
    const id = req.params.id

    try {

        const userDB = await User.findById( uid )

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No exite ningún usuario con ese ID'
            })
        }

        if ( userDB.role === 'ADMIN_ROLE' || uid === id ) {
            next()
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No es un usuario administrativo'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    validateJWT,
    validateAdminRole,
    validateAdminRole_or_sameUser 
}