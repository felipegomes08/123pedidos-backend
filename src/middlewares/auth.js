const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ error: 'Token não identificado' })
  }

  const parts = authHeader.split('Bearer ')

  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Token error' })
  }

  const [, token] = parts

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido' })
    } else {
      req.idEmpresa = decoded.id
      return next()
    }
  })
}
