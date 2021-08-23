const categoryModel = require('../models/category')

class CategoryController {
  async findAll() {
    return await categoryModel.find()
  }

  async findOne(query) {
    return await categoryModel.findOne(query)
  }

  async create(category) {
    return await categoryModel.create(category)
  }

  async update(idCategory, category) {
    return await categoryModel.findByIdAndUpdate(
      { _id: idCategory },
      {
        name: category.name,
        description: category.description,
      },
      { runValidators: true }
    )
  }

  async delete(id) {
    return await categoryModel.deleteOne({ _id: id })
  }
}

module.exports = new CategoryController()
