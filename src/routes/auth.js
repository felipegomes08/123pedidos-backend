const bcrypt = require('bcryptjs')
const express = require('express')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')
const empresaController = require('../controllers/empresa')
const empresaModel = require('../models/empresa')

const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    const empresa = await empresaModel.findOne({ username }).select('+password')

    if (!empresa || !(await bcrypt.compare(password, empresa.password))) {
      return res.status(400).send({
        error: 'Usuário ou senha incorretos',
      })
    }

    empresa.password = undefined

    const token = jwt.sign({ id: empresa._id }, authConfig.secret, {
      expiresIn: 86400,
    })

    return res.send({ empresa, token })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      error: 'Erro ao validar suas credênciais',
    })
  }
})

// somente ADMs(donos do 123pedidos) podem cadastar
router.post('/cadastrar', async (req, res) => {
  try {
    const { name, username, password } = req.body

    if (!(await empresaController.find({ username }))) {
      return res.status(400).send({
        error: 'Já existe um usuário cadastrado com esse nome',
      })
    }

    const empresa = await empresaController.create({
      name,
      username,
      password,
    })

    empresa.active = undefined
    empresa.password = undefined
    empresa.isAdmin = undefined
    empresa.createdAt = undefined

    return res.send(empresa)
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      error: 'Erro ao cadastrar o usuário',
    })
  }
})

module.exports = router
