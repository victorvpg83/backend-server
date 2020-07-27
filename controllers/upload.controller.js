const { response } = require('express');
const fs = require('fs')
const path = require('path')

const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');


const fileUpload = ( req, res = response ) => {

    const type = req.params.type
    const id = req.params.id

    // Validate types
    const validTypes = [ 'users', 'doctors', 'hospitals' ]

    if ( !validTypes.includes( type ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo no es válido'
        })
    }

    // Validate exist file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Process image
    const file = req.files.image

    const cutName = file.name.split( '.' )
    const extensionFile = cutName[cutName.length - 1]

    // Validate Extension
    const validExtensions = [ 'png', 'jpg', 'jpeg', 'gif' ]

    if ( !validExtensions.includes( extensionFile ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'Extensión de archivo no válido'
        });
    }

    // Generate file name
    const fileName = `${ uuidv4() }.${ extensionFile }`

    // save path:
    const path = `./uploads/${ type }/${ fileName }`

    // Move image
  file.mv( path , (err) => {
    if (err) {
        console.log(err)
        return res.status(500).json({
            ok: false,
            msg: 'Error al guardar la imagen'
        })
    }

    // update DB
    updateImage( type, id, fileName )

    res.json({
        ok: true,
        msg: 'Archivo subido',
        fileName
    })
  });

}

const returnImg = ( req, res = response ) => {
    const type = req.params.type
    const image = req.params.image

    const pathImg = path.join( __dirname, `../uploads/${ type }/${ image }` )

    // default image
    if( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg )
    } else {
        const pathImg = path.join( __dirname, `../uploads/noimage.jpeg` )
        res.sendFile( pathImg )
    }


}

module.exports = {
    fileUpload,
    returnImg
}