const express = require('express')
const jwtToken = require('jsonwebtoken')

const empresaController = require('../controllers/empresa')
const authMiddleware = require('../middlewares/auth')
const empresaMiddleware = require('../middlewares/empresa')

const router = express.Router()

router.get('/companies', authMiddleware, empresaMiddleware.isAdmin, async (req, res) => {
  try {
    const allCompanies = await empresaController.findAll()

    if (!allCompanies) {
      throw new Error('Não há nenhum usuário cadastrado')
    }

    return res.send(allCompanies)
  } catch (error) {
    return res.status(400).send({
      error: 'Erro ao listar os usuários',
    })
  }
})

router.get(
  '/companies/:idEmpresa',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const { idEmpresa } = req.params

      const empresa = await empresaController.findOne({ _id: idEmpresa })

      if (!idEmpresa) {
        throw new Error('Não há nenhuma empresa cadastrada')
      }

      return res.send(empresa)
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao buscar o usuário',
      })
    }
  }
)

router.post(
  '/companies/status',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const { active } = req.body

      const { authorization } = req.headers

      const token = authorization.substring(7)

      const tokenDecoded = jwtToken.decode(token)

      const { id } = tokenDecoded

      const empresa = await empresaController.updateActive(id, active)

      if (!empresa) {
        throw new Error('Erro ao atualizar o status da Empresa')
      }

      return res.send({ message: 'Status alterado com sucesso' })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao atualizar o status da Empresa',
      })
    }
  }
)

router.put('/companies', authMiddleware, empresaMiddleware.isAdmin, async (req, res) => {
  try {
    const { name, username, password } = req.body

    const { authorization } = req.headers

    const token = authorization.substring(7)

    const tokenDecoded = jwtToken.decode(token)

    const { id } = tokenDecoded

    await empresaController.update(id, {
      name,
      username,
      password,
    })

    return res.send({
      message: 'Empresa atualizada com sucesso',
    })
  } catch (error) {
    return res.status(400).send({
      error: 'Erro ao atualizar a Empresa',
    })
  }
})

router.delete(
  '/companies/:idEmpresa',
  authMiddleware,
  empresaMiddleware.isAdmin,
  async (req, res) => {
    try {
      const { idEmpresa } = req.params

      const isDeleted = await empresaController.delete(idEmpresa)

      if (!isDeleted) {
        throw new Error('Erro ao deletar a Empresa')
      }

      return res.send({
        message: 'Empresa deletada com sucesso',
      })
    } catch (error) {
      return res.status(400).send({
        error: 'Erro ao deletar a Empresa',
      })
    }
  }
)

module.exports = router
