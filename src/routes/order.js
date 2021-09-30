const express = require('express')
const jwtToken = require('jsonwebtoken')

const additionalController = require('../controllers/additional')
const cardapioController = require('../controllers/cardapio')
const orderController = require('../controllers/order')
const authMiddleware = require('../middlewares/auth')
const empresaMiddleware = require('../middlewares/empresa')

const router = express.Router()

router.get('/orders', authMiddleware, empresaMiddleware.isAdmin, async (req, res) => {
  try {
    const { authorization } = req.headers

    const token = authorization.substring(7)

    const tokenDecoded = jwtToken.decode(token)

    const { id } = tokenDecoded

    const allOrdersOfCompanies = await orderController.findAll({
      externalCardapioReference: id,
    })

    if (!allOrdersOfCompanies) {
      throw new Error('Não há nenhum adicional cadastrado')
    }

    return res.send(allOrdersOfCompanies)
  } catch (error) {
    return res.status(400).send({
      error: 'Erro ao listar os pedidos do cardapio dessa empresa',
    })
  }
})

router.get(
  '/orders/:idOrder',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const { idOrder } = req.params

      const { authorization } = req.headers

      const token = authorization.substring(7)

      const tokenDecoded = jwtToken.decode(token)

      const { id } = tokenDecoded

      if (!idOrder || id) {
        throw new Error('Id da requisição/Empresa incorreto')
      }

      const order = await orderController.findOne({
        _id: idOrder,
        externalCardapioReference: id,
      })

      return res.send(order)
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao buscar o pedido',
      })
    }
  }
)

router.post('/orders', async (req, res) => {
  try {
    const { items, externalCardapioReference } = req.body

    const cardapio = await cardapioController.findOne({
      _id: externalCardapioReference,
    })

    let totalPriceItems = 0
    let totalPriceAdditionals = 0
    let total = 0

    if (!cardapio) throw new Error('Cardapio não cadastrado')

    for (const item of items) {
      const [itemInCardapio] = await cardapioController.itemInCardapio(
        cardapio._id,
        item.externalItemCardapioReference
      )

      if (!itemInCardapio.items[0]) throw new Error('Item do cardapio não encontrado')

      const { maxChoice, price } = itemInCardapio.items[0]

      // Verificar se existe adicionais e a opção selecionada, bem somar seus valores
      if (
        item?.options?.multipleChoice === true &&
        item?.additionals?.length > 1 &&
        item?.additionals?.length <= maxChoice
      ) {
        for (const additional of item.additionals) {
          const { price } = await additionalController.findOne({ _id: additional })

          if (!price) throw new Error('Erro ao encontrar o adicional')

          totalPriceAdditionals += price * item.amount
        }
      } else if (
        item?.options?.uniqueChoice === true &&
        item?.additionals?.length === 1
      ) {
        const [id] = item.additionals

        const { price } = await additionalController.findOne({ _id: id })

        if (!price) throw new Error('Erro ao encontrar o adicional')

        totalPriceAdditionals += price * item.amount
      }

      totalPriceItems += price * item.amount
    }

    total = totalPriceItems + totalPriceAdditionals

    const order = {
      items,
      externalCardapioReference,
      status: 'Aguardando',
      total,
    }

    await orderController.create(order)

    return res.send({ Pedido: order })
  } catch (error) {
    return res.status(400).send({
      error: 'Erro ao criar um adicional',
    })
  }
})

router.put(
  '/orders/:idOrder',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const { authorization } = req.headers

      const token = authorization.substring(7)

      const tokenDecoded = jwtToken.decode(token)

      const { id } = tokenDecoded

      const { idOrder } = req.params

      const { status } = req.body

      const orderSaved = await orderController.findOne({ _id: idOrder })

      if (!orderSaved) throw new Error('Ocorreu um erro ao encontrar o pedido')

      await orderController.update(idOrder, id, status)

      return res.send({
        message: 'Status do pedido atualizado com sucesso',
      })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao atualizar o status do pedido',
      })
    }
  }
)

module.exports = router
