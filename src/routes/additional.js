const express = require('express')
const jwtToken = require('jsonwebtoken')

const additionalController = require('../controllers/additional')
const cardapioController = require('../controllers/cardapio')
const authMiddleware = require('../middlewares/auth')
const empresaMiddleware = require('../middlewares/empresa')

const router = express.Router()

router.get(
  '/additionals',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const allAdditionals = await additionalController.findAll()

      if (!allAdditionals) {
        throw new Error('Não há nenhum adicional cadastrado')
      }

      return res.send(allAdditionals)
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao listar os Adicionais',
      })
    }
  }
)

router.get(
  '/additionals/:idAdditional',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const { idAdditional } = req.params

      if (!idAdditional) {
        throw new Error('Adicional incorreto')
      }

      const additional = await additionalController.findOne({ _id: idAdditional })

      return res.send(additional)
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao buscar o adicional',
      })
    }
  }
)

router.get(
  '/additionals-cardapio',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const { authorization } = req.headers

      const token = authorization.substring(7)

      const tokenDecoded = jwtToken.decode(token)

      const { id } = tokenDecoded

      const allAdditionals = await additionalController.findAllToCardapio(id)

      if (!allAdditionals) {
        throw new Error('Não há nenhum adicional cadastrado nesse cardapio')
      }

      return res.send(allAdditionals)
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao listar os Adicionais do Cardapio',
      })
    }
  }
)

router.post(
  '/additionals',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const additional = req.body

      const carpadio = await cardapioController.findOne({
        _id: additional.externalCardapioReference,
      })

      if (!carpadio) throw new Error('Cardapio não cadastrado')

      await additionalController.create(additional)

      return res.send({ message: 'Adicional criado com sucesso' })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao criar um adicional',
      })
    }
  }
)

router.put(
  '/additionals/:idAdditional',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const { idAdditional } = req.params

      const additional = req.body

      const additionalSaved = await additionalController.findOne({ _id: idAdditional })

      if (!additionalSaved) throw new Error('Ocorreu um erro ao encontrar o adicional')

      await additionalController.update(idAdditional, additional)

      return res.send({
        message: 'Adicional atualizado com sucesso',
      })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao atualizar o adicional',
      })
    }
  }
)

router.delete(
  '/additionals/:idAdditional',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const { idAdditional } = req.params

      const additional = await additionalController.findOne({
        _id: idAdditional,
      })

      if (!additional) {
        return res.status(404).send({
          error: 'Erro ao encontrar esse adicional',
        })
      }

      await additionalController.delete(idAdditional)

      return res.send({
        message: 'Adicional deletado com sucesso',
      })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao deletar o adicional',
      })
    }
  }
)

module.exports = router
