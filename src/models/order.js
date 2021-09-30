const mongoose = require('../database/mongo')

const Order = new mongoose.Schema(
  {
    externalCardapioReference: {
      type: String,
      required: [true, 'Id do Cardapio é obrigatório'],
      trim: true,
    },
    items: [
      {
        externalItemCardapioReference: {
          type: String,
          required: [true, 'Id do item do Cardapio é obrigatório'],
          trim: true,
        },
        amount: {
          type: Number,
          required: [true, 'Quantidade do item do carpadio é obrigatório'],
          trim: true,
        },
        options: {
          multipleChoice: {
            type: Boolean,
            required: [false, 'Opção de Multipla escolha opcional'],
            default: false,
          },
          uniqueChoice: {
            type: Boolean,
            required: [false, 'Opção de Unica escolha opcional'],
            default: false,
          },
        },
        additionals: [String],
      },
    ],
    status: {
      type: String,
      required: [true, 'Status do pedido é obrigatório'],
      trim: true,
    },
    total: {
      type: Number,
      required: [true, 'Total do pedido é obrigatório'],
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

const orderSchema = mongoose.model('orders', Order)

module.exports = orderSchema
