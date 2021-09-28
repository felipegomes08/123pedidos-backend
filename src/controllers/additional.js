const additionalModel = require('../models/additional')

class AdditionalController {
  async findAll() {
    return await additionalModel.find()
  }

  async findOne(query) {
    return await additionalModel.findOne(query)
  }

  async create(additional) {
    return await additionalModel.create(additional)
  }

  async update(idAdditional, additional) {
    return await additionalModel.findByIdAndUpdate(
      { _id: idAdditional },
      {
        $set: {
          title: additional.title,
          price: additional.price,
        },
      },
      { runValidators: true }
    )
  }

  async delete(id) {
    return await additionalModel.deleteOne({ _id: id })
  }

  async findAllToCardapio(idCardapio) {
    return await additionalModel.find({ externalCardapioReference: idCardapio })
  }
}

module.exports = new AdditionalController()
