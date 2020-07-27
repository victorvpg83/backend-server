// /api/upload

const { Router } = require('express')
const expressFileUpload = require('express-fileupload');


const { validateJWT } = require('../middlewares/validate-jwt')
const { fileUpload, returnImg } = require('../controllers/upload.controller');
const app = require('./app.routes');


const router = Router()

router.use( expressFileUpload() )

router.put( '/:type/:id', validateJWT, fileUpload )
router.get( '/:type/:image', returnImg )


module.exports = router