const empresaController = require('../controllers/empresa')
const empresaModel = require('../models/empresa')

module.exports = {
  isActivatedEmpresa: async (req, res, next) => {
    try {
      const _id = req.idEmpresa
      const existEmpresa = await empresaController.findOne({ _id })

      if (existEmpresa && existEmpresa.active) {
        next()
      } else {
        res.status(404).send({
          error: 'Empresa inativa ou inexistente',
        })
      }
    } catch (error) {
      res.status(404).send({
        error: 'Empresa inativa ou inexistente',
      })
    }
  },
  isAdmin: async (req, res, next) => {
    const { isAdmin } = await empresaModel
      .findOne({ _id: req.idEmpresa })
      .select('+isAdmin')

    if (!isAdmin) {
      return res.status(400).send({
        error: 'Permissão negada',
      })
    }

    next()
  },
}
