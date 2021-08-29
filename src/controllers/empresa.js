const bcrypt = require('bcryptjs')

const empresaModel = require('../models/empresa')

const cardapioController = require('./cardapio')

class EmpresaController {
  async findAll() {
    return await empresaModel.find()
  }

  async findOne(query) {
    return await empresaModel.findOne(query)
  }

  async create(empresa) {
    return await empresaModel.create(empresa)
  }

  async update(_id, empresa) {
    const hash = await bcrypt.hash(empresa.password, 10)

    empresa.password = hash

    return await empresaModel.updateOne(
      { _id },
      {
        $set: {
          name: empresa.name,
          username: empresa.username,
          password: empresa.password,
        },
      },
      { runValidators: true }
    )
  }

  async updateActive(_id, active) {
    return await empresaModel.findByIdAndUpdate({ _id }, { $set: { active } })
  }

  async delete(id) {
    const empresa = await empresaModel.findByIdAndDelete(id)
    if (empresa) {
      return await cardapioController.delete(id)
    }
  }
}

module.exports = new EmpresaController()
