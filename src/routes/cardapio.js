const express = require('express')
const jwtToken = require('jsonwebtoken')

const cardapioController = require('../controllers/cardapio')
const categoryController = require('../controllers/category')
const empresaController = require('../controllers/empresa')
const authMiddleware = require('../middlewares/auth')
const empresaMiddleware = require('../middlewares/empresa')

const router = express.Router()

router.get('/cardapio', authMiddleware, empresaMiddleware.isAdmin, async (req, res) => {
  try {
    const allCardapios = await cardapioController.findAll()

    if (!allCardapios) {
      throw new Error('Não há nenhum cardápio cadastrado')
    }

    return res.send(allCardapios)
  } catch (error) {
    return res.status(400).send({
      error: 'Erro ao listar os cardápios',
    })
  }
})

router.get('/cardapio/:idCardapio', async (req, res) => {
  try {
    const { idCardapio } = req.params

    const cardapio = await cardapioController.findOne({ _id: idCardapio })

    if (!cardapio) {
      throw new Error('Não há nenhum cardápio cadastrado')
    }

    return res.send(cardapio)
  } catch (error) {
    return res.status(400).send({
      error: 'Erro ao buscar o cardápio',
    })
  }
})

router.post(
  '/cardapios',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      const { logo, banner, items } = req.body
      const { authorization } = req.headers

      const token = authorization.substring(7)

      const tokenDecoded = jwtToken.decode(token)

      const { id } = tokenDecoded

      const empresa = await empresaController.findOne({ _id: id })

      if (!empresa) return res.status(404).send({ error: 'Empresa não cadastrada' })

      if (!items.length)
        return res
          .status(400)
          .send({ error: 'Items são necessários para criar um Cardapio' })

      for (const item of items) {
        const category = await categoryController.findOne({ _id: item.idCategory })
        if (!category) return res.status(404).send({ error: 'Categoria não cadastrada' })
      }

      await cardapioController.create({ _id: id, logo, banner, items })

      return res.send({
        message: 'Cardápio criado com sucesso',
      })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao cadastrar o cardápio',
      })
    }
  }
)

router.post(
  '/cardapios/items',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      const { items } = req.body
      const { authorization } = req.headers

      const token = authorization.substring(7)

      const tokenDecoded = jwtToken.decode(token)

      const { id } = tokenDecoded

      const empresa = await empresaController.findOne({ _id: id })

      if (!empresa) return res.status(404).send({ error: 'Empresa não cadastrada' })

      if (!items.length)
        return res.status(400).send({ error: 'Items do cardapio são obrigatórios' })

      for (const item of items) {
        const category = await categoryController.findOne({ _id: item.idCategory })

        if (!category) return res.status(404).send({ error: 'Categoria não cadastrada' })
      }

      await cardapioController.pushItems(id, items)

      return res.send({
        message: 'Items do Cardápio adicionados com sucesso',
      })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao cadastrar o cardápio',
      })
    }
  }
)

router.put(
  '/cardapios',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      const { logo, banner } = req.body
      const { authorization } = req.headers

      const token = authorization.substring(7)

      const tokenDecoded = jwtToken.decode(token)

      const { id } = tokenDecoded

      const empresa = await empresaController.findOne({ _id: id })

      if (!empresa) return res.status(404).send({ error: 'Empresa não cadastrada' })

      await cardapioController.update(id, { logo, banner })

      return res.send({
        message: 'Cardápio atualizado com sucesso',
      })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao atualizar o cardápio',
      })
    }
  }
)

router.put(
  '/cardapios/items/:idItem',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      const item = req.body
      const { idItem } = req.params
      const { authorization } = req.headers

      const token = authorization.substring(7)

      const tokenDecoded = jwtToken.decode(token)

      const { id } = tokenDecoded

      const empresa = await empresaController.findOne({ _id: id })

      if (!empresa) return res.status(404).send({ error: 'Empresa não cadastrada' })
      if (!item)
        return res.status(404).send({ error: 'Entre com todos os dados corretamente' })

      await cardapioController.updateItemInCardapio(id, idItem, item)

      return res.send({
        message: 'Item do Cardápio atualizado com sucesso',
      })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao atualizar item do cardápio',
      })
    }
  }
)

router.delete(
  '/cardapios/:idCardapio',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      const { idCardapio } = req.params

      const isDeleted = await cardapioController.delete(idCardapio)

      if (!isDeleted) {
        throw new Error('Erro ao deletar o cardápio')
      }

      return res.send({
        message: 'Cardápio deletado com sucesso',
      })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao cadastrar o cardápio',
      })
    }
  }
)

router.delete(
  '/cardapios/items/:idItem',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      const { idItem } = req.params
      const { authorization } = req.headers

      const token = authorization.substring(7)

      const tokenDecoded = jwtToken.decode(token)

      const { id } = tokenDecoded

      const empresa = await empresaController.findOne({ _id: id })

      if (!empresa) return res.status(404).send({ error: 'Empresa não cadastrada' })

      await cardapioController.deleteItemInCardapio(id, idItem)

      return res.send({
        message: 'Item do Cardápio deletado com sucesso',
      })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao deletar item do cardápio',
      })
    }
  }
)

module.exports = router
