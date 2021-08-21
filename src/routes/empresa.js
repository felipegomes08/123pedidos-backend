const express = require('express')

const empresaController = require('../controllers/empresa')
const authMiddleware = require('../middlewares/auth')
const empresaMiddleware = require('../middlewares/empresa')

const router = express.Router()

router.get('/user', authMiddleware, empresaMiddleware.isAdmin, async (req, res) => {
  try {
    const allCompanies = await empresaController.findAll()

    if (!allCompanies) {
      throw new Error('Não há nenhum usuário cadastrado')
    }

    return res.send(allCompanies)
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      error: 'Erro ao listar os usuários',
    })
  }
})

router.get(
  '/user/:username',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const username = req.params.username

      if (!username) {
        throw new Error('Não há nenhum usuário cadastrado')
      }

      const empresa = await empresaController.find({ username })

      return res.send(empresa)
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        error: 'Erro ao buscar o usuário',
      })
    }
  }
)

router.post(
  '/user/status',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const { idEmpresa, active } = req.body

      const empresa = await empresaController.updateActive(idEmpresa, active)

      if (!empresa) {
        throw new Error('Erro ao atualizar o status do usuário')
      }

      return res.send({ message: 'Status alterado com sucesso' })
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        error: 'Erro ao atualizar o status do usuário',
      })
    }
  }
)

router.put(
  '/user/:username',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const user = req.params.username

      const { active, name, username, password } = req.body

      const empresa = await empresaController.find({ username: user })

      const empresaUpdated = await empresaController.update(empresa._id, {
        active,
        name,
        username,
        password,
      })

      if (!empresaUpdated) {
        throw new Error('Erro ao atualizar o usuário')
      }

      return res.send({
        message: 'Usuário atualizado com sucesso',
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        error: 'Erro ao cadastrar o usuário',
      })
    }
  }
)

router.delete('/user', authMiddleware, empresaMiddleware.isAdmin, async (req, res) => {
  try {
    const { id } = req.body

    const isDeleted = await empresaController.delete(id)

    if (!isDeleted) {
      throw new Error('Erro ao deletar o usuário')
    }

    return res.send({
      message: 'Usuário deletado com sucesso',
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      error: 'Erro ao deletar o usuário',
    })
  }
})

module.exports = router
