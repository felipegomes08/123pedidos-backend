const express = require('express')

const additionalRoutes = require('./routes/additional')
const authRoutes = require('./routes/auth')
const cardapioRoutes = require('./routes/cardapio')
const categoryRoutes = require('./routes/category')
const empresaRoutes = require('./routes/empresa')
const ordersRoutes = require('./routes/order')

const router = express.Router()

router.use(authRoutes)
router.use(empresaRoutes)
router.use(cardapioRoutes)
router.use(categoryRoutes)
router.use(additionalRoutes)
router.use(ordersRoutes)

module.exports = router
