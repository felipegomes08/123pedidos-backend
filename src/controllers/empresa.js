const empresaModel = require('../models/empresa')

const cardapioController = require('./cardapio')

class EmpresaController {
  async findAll() {
    return await empresaModel.find()
  }

  async find(query) {
    return await empresaModel.find(query)
  }

  async create(empresa) {
    return await empresaModel.create(empresa)
  }

  async update(_id, empresa) {
    return await empresaModel.findByIdAndUpdate(
      { _id },
      {
        active: empresa.active,
        name: empresa.name,
        username: empresa.username,
        password: empresa.password,
      },
      { runValidators: true }
    )
  }

  async updateActive(_id, active) {
    return await empresaModel.findByIdAndUpdate(
      { _id },
      {
        active,
      }
    )
  }

  async delete(id) {
    const empresa = await empresaModel.findByIdAndDelete(id)
    if (empresa) {
      return await cardapioController.delete(id)
    }
  }
}

module.exports = new EmpresaController()
