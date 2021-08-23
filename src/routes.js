const express = require('express')

const authRoutes = require('./routes/auth')
const cardapioRoutes = require('./routes/cardapio')
const categoryRoutes = require('./routes/category')
const empresaRoutes = require('./routes/empresa')

const router = express.Router()

router.use(authRoutes)
router.use(empresaRoutes)
router.use(cardapioRoutes)
router.use(categoryRoutes)

module.exports = router
