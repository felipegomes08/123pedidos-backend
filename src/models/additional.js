const mongoose = require('../database/mongo')

const Additional = new mongoose.Schema(
  {
    externalCardapioReference: {
      type: String,
      required: [true, 'Id do Cardapio é obrigatório'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Título do adicional é obrigatório'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Preço do adicional é obrigatório'],
      trim: true,
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

const additionalSchema = mongoose.model('additional', Additional)

module.exports = additionalSchema
