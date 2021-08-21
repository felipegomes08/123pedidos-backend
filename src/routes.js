const express = require('express')

const authRoutes = require('./routes/auth')
const cardapioRoutes = require('./routes/cardapio')
const empresaRoutes = require('./routes/empresa')

const router = express.Router()

router.use(authRoutes)
router.use(empresaRoutes)
router.use(cardapioRoutes)

module.exports = router
