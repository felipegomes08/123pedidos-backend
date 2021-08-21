const cardapioModel = require('../models/cardapio')

class CadapioController {
  async findAll() {
    return await cardapioModel.find()
  }

  async find(query) {
    return await cardapioModel.findOne(query)
  }

  async createOrUpdate(cardapio) {
    return await cardapioModel.create(cardapio)
  }

  async create(cardapio) {
    return await cardapioModel.create(cardapio)
  }

  async update(_id, cardapio) {
    return await cardapioModel.findByIdAndUpdate(
      { _id },
      {
        nameEmpresa: cardapio.nameEmpresa,
        username: cardapio.username,
        password: cardapio.password,
      },
      { runValidators: true }
    )
  }

  async delete(id) {
    return await cardapioModel.findByIdAndDelete(id)
  }

  async isActive(active) {
    return await cardapioModel.findByIdAndDelete(active)
  }
}

module.exports = new CadapioController()
