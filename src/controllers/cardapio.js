const cardapioModel = require('../models/cardapio')
class CadapioController {
  async findAll() {
    return await cardapioModel.find()
  }

  async findOne(query) {
    return await cardapioModel.findOne(query)
  }

  async create(cardapio) {
    return await cardapioModel.create(cardapio)
  }

  async pushItems(id, items) {
    return await cardapioModel.updateOne({ _id: id }, { $push: { items } })
  }

  async update(_id, cardapio) {
    return await cardapioModel.updateOne(
      { _id },
      { $set: { logo: cardapio.logo, banner: cardapio.banner } },
      { runValidators: true }
    )
  }

  async updateItemInCardapio(idCardapio, idItem, item) {
    return await cardapioModel.updateOne(
      { _id: idCardapio, 'items._id': idItem },
      { $set: { 'items.$': item } },
      { runValidators: true }
    )
  }

  async delete(IdCardapio) {
    return await cardapioModel.findByIdAndDelete(IdCardapio)
  }

  async deleteItemInCardapio(id, idItem) {
    return await cardapioModel.updateOne(
      { _id: id, 'items._id': idItem },
      { $pull: { items: { _id: idItem } } }
    )
  }

  async categoriesActive(id, idCategory) {
    return await cardapioModel.find({ _id: id, 'items.idCategory': idCategory })
  }

  async itemInCardapio(id, idItem) {
    return await cardapioModel.find(
      { _id: id, 'items._id': idItem },
      { _id: 0, items: { $elemMatch: { _id: idItem } } }
    )
  }
}

module.exports = new CadapioController()
