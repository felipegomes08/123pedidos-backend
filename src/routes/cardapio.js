const express = require('express')

const cardapioController = require('../controllers/cardapio')
// const empresaController = require('../controllers/empresa')
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
    console.log(error)
    return res.status(400).send({
      error: 'Erro ao listar os cardápios',
    })
  }
})

router.get('/cardapio/:username', async (req, res) => {
  try {
    const username = req.params.username

    if (!username) {
      throw new Error('Não há nenhum cardápio cadastrado')
    }

    const empresa = await cardapioController.find({ username })

    // terminar
    // if (empresa) {
    //   const user = await empresaController.find({ username })
    // }
    return res.send(empresa)
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      error: 'Erro ao buscar o cardápio',
    })
  }
})

router.post(
  '/cardapio',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      // const { name } = req.body
      console.log(req.idEmpresa)

      // const empresa = await empresaController.find({ _id: req.idEmpresa });
      // await cardapioController.create({ _id: username, cardapio });

      return res.send({
        message: 'Cardápio criado com sucesso',
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        error: 'Erro ao cadastrar o cardápio',
      })
    }
  }
)

router.post(
  '/cardapio/category',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      const username = req.params.username
      const { cardapio } = req.body

      // const empresa = await empresaController.find({ _id: req.idEmpresa })
      console.log(req.idEmpresa)
      await cardapioController.create({ _id: username, cardapio })

      return res.send({
        message: 'Cardápio criado com sucesso',
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        error: 'Erro ao cadastrar o cardápio',
      })
    }
  }
)

router.post(
  '/cardapio/category/item',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      const username = req.params.username
      const { cardapio } = req.body

      // const empresa = await empresaController.find({ _id: req.idEmpresa })
      console.log(req.idEmpresa)
      await cardapioController.create({ _id: username, cardapio })

      return res.send({
        message: 'Cardápio criado com sucesso',
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        error: 'Erro ao cadastrar o cardápio',
      })
    }
  }
)

router.put(
  '/cardapio',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      const username = req.params.username
      const { cardapio } = req.body

      // const empresa = await empresaController.find({ _id: req.idEmpresa })
      console.log(req.idEmpresa)
      await cardapioController.create({ _id: username, cardapio })

      return res.send({
        message: 'Cardápio criado com sucesso',
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        error: 'Erro ao cadastrar o cardápio',
      })
    }
  }
)

router.put(
  '/cardapio/category',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      const username = req.params.username
      const { cardapio } = req.body

      // const empresa = await empresaController.find({ _id: req.idEmpresa })
      console.log(req.idEmpresa)
      await cardapioController.create({ _id: username, cardapio })

      return res.send({
        message: 'Cardápio criado com sucesso',
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        error: 'Erro ao cadastrar o cardápio',
      })
    }
  }
)

router.put(
  '/cardapio/category/item',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      const username = req.params.username
      const { cardapio } = req.body

      // const empresa = await empresaController.find({ _id: req.idEmpresa })
      console.log(req.idEmpresa)
      await cardapioController.create({ _id: username, cardapio })

      return res.send({
        message: 'Cardápio criado com sucesso',
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        error: 'Erro ao cadastrar o cardápio',
      })
    }
  }
)

router.delete(
  '/cardapio',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      const { idCardapio } = req.body

      const isDeleted = await cardapioController.delete(idCardapio)

      if (!isDeleted) {
        throw new Error('Erro ao deletar o cardápio')
      }

      return res.send({
        message: 'Cardápio deletado com sucesso',
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        error: 'Erro ao cadastrar o cardápio',
      })
    }
  }
)

router.delete(
  '/cardapio/category',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      const { idCardapio } = req.body

      const isDeleted = await cardapioController.delete(idCardapio)

      if (!isDeleted) {
        throw new Error('Erro ao deletar o cardápio')
      }

      return res.send({
        message: 'Cardápio deletado com sucesso',
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        error: 'Erro ao cadastrar o cardápio',
      })
    }
  }
)

router.delete(
  '/cardapio/category/item',
  authMiddleware,
  empresaMiddleware.isActivatedEmpresa,
  async (req, res) => {
    try {
      const { idCardapio } = req.body

      const isDeleted = await cardapioController.delete(idCardapio)

      if (!isDeleted) {
        throw new Error('Erro ao deletar o cardápio')
      }

      return res.send({
        message: 'Cardápio deletado com sucesso',
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        error: 'Erro ao cadastrar o cardápio',
      })
    }
  }
)

module.exports = router
