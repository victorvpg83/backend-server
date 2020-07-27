// /api/all/:search

const { Router } = require('express')

const { validateJWT } = require('../middlewares/validate-jwt')

const { getAll, getCollectionDocs } = require('../controllers/search.controller')

const router = Router()

router.get( '/:search', validateJWT, getAll )
router.get( '/collection/:table/:search', validateJWT, getCollectionDocs )


module.exports = router