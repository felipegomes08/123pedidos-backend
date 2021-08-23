const mongoose = require('../database/mongo')

const Category = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome da categoria é obrigatório'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Descrição da categoria é obrigatória'],
      trim: true,
      lowercase: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
      select: false,
    },
  },
  {
    versionKey: false,
  }
)

const categorySchema = mongoose.model('category', Category)

module.exports = categorySchema
