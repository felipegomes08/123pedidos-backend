const orderModel = require('../models/order')

class OrderController {
  async findAll(query) {
    return await orderModel.find(query)
  }

  async findOne(query) {
    return await orderModel.findOne(query)
  }

  async create(order) {
    return await orderModel.create(order)
  }

  async update(idOrder, id, status) {
    return await orderModel.updateOne(
      { _id: idOrder, externalCardapioReference: id },
      { $set: { status } }
    )
  }
}

module.exports = new OrderController()
