const express = require('express')
const jwtToken = require('jsonwebtoken')

const cardapioController = require('../controllers/cardapio')
const categoryController = require('../controllers/category')
const authMiddleware = require('../middlewares/auth')
const empresaMiddleware = require('../middlewares/empresa')

const router = express.Router()

router.get('/categories', authMiddleware, empresaMiddleware.isAdmin, async (req, res) => {
  try {
    const allcategories = await categoryController.findAll()

    if (!allcategories) {
      throw new Error('Não há nenhuma categoria cadastrada')
    }

    return res.send(allcategories)
  } catch (error) {
    return res.status(400).send({
      error: 'Erro ao listar as categorias',
    })
  }
})

router.get(
  '/categories/:idCategory',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const { idCategory } = req.params

      if (!idCategory) {
        throw new Error('Categoria incorreta')
      }

      const category = await categoryController.findOne({ _id: idCategory })

      return res.send(category)
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao buscar a Categória',
      })
    }
  }
)

router.post(
  '/categories',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const category = req.body

      await categoryController.create(category)

      return res.send({ message: 'Categoria criada com sucesso' })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao criar uma categoria',
      })
    }
  }
)

router.put(
  '/categories/:idCategory',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const { idCategory } = req.params

      const category = req.body

      const categorySaved = await categoryController.findOne({ _id: idCategory })

      if (!categorySaved) throw new Error('Ocorreu um erro ao encontrar a categoria')
      await categoryController.update(idCategory, category)

      return res.send({
        message: 'Categoria atualizada com sucesso',
      })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao atualizar a categoria',
      })
    }
  }
)

router.delete(
  '/categories/:idCategory',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const { idCategory } = req.params
      const { authorization } = req.headers

      const token = authorization.substring(7)

      const tokenDecoded = jwtToken.decode(token)

      const { id } = tokenDecoded

      const categoriesInCardapio = await cardapioController.categoriesInCardapio(
        id,
        idCategory
      )

      if (categoriesInCardapio.items) {
        return res.status(400).send({
          error: 'Delete os items cadastrados com essa categoria, antes de Deleta -la',
        })
      }

      await categoryController.delete(idCategory)

      return res.send({
        message: 'Categoria deletada com sucesso',
      })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao deletar a categoria',
      })
    }
  }
)

module.exports = router
