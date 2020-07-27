const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { genJwt } = require('../helpers/jwt')


const getUsers = async ( req, res ) => {

    const from = Number(req.query.from) || 0

    const [ users, total ] = await Promise.all([
        User.find( {}, 'name email role google img' )
            .skip( from )
            .limit( 5 ),

        User.countDocuments()
    ])

    res.json({
        ok: true,
        users,
        total
    })
}

const createUser = async ( req, res = response ) => {

    const { email, password } = req.body

    try {

        const emailExist = await User.findOne({ email })

        if ( emailExist ) {
            return res.status(500).json({
                ok: false,
                msg: 'El correo ya existe'
            })
        }

        const user = new User( req.body )

        // Crypt password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        // Save user
        await user.save()

        // Generate Token
        const token = await genJwt( user.id )
    
        res.json({
            ok: true,
            user,
            token
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const updateUser = async ( req, res = response ) => {

    const uid = req.params.id

    try {

        const dbUser = await User.findById( uid )

        if ( !dbUser ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningún usuario con ese id'
            })
        }

        // TODO: Validate token and correct user

        // Update user
        const { password, google, email, ...fields } = req.body

        if ( dbUser.email !== email ) {

            const existEmail = await User.findOne({ email })

            if ( existEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        fields.email = email

        const updateUser = await User.findByIdAndUpdate( uid, fields, { new: true } )

        res.json({
            ok: true,
            user: updateUser
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

// Delete User

const deleteUser = async ( req, res = response ) => {

    const uid = req.params.id

    try {

        const dbUser = await User.findById( uid )

        if ( !dbUser ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningún usuario con ese id'
            })
        }

        await User.findByIdAndDelete( uid )

        res.json({
            ok: true,
            msj: 'Usuario eliminado'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msj: 'Ha habido un problema'
        })
    }

}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}