const mongoose = require('../database/mongo')

const cardapio = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, 'Id da empresa é obrigatório'],
      trim: true,
      unique: true,
    },
    logo: {
      type: String,
      trim: true,
    },
    banner: {
      type: String,
      trim: true,
    },
    items: [
      {
        title: {
          type: String,
          required: [true, 'Título é obrigatório'],
          trim: true,
        },
        idCategory: {
          type: String,
          required: [true, 'Id da Categoria é obrigatório'],
          trim: true,
        },
        description: {
          type: String,
          required: [true, 'Descrição é obrigatório'],
          trim: true,
        },
        price: {
          type: Number,
          required: [true, 'Preço é obrigatório'],
          trim: true,
        },
        urlImage: {
          type: String,
          trim: true,
        },
        options: {
          multipleChoice: [
            {
              title: {},
              description: {},
              price: {},
            },
          ],
          uniqueChoice: {},

          // multipla escolha, com um limite predeterminado
          // ou
          // unica escolha
          //
          // titulo da opção obrigatório
          //  nome obrigatório
          //  descrição
          //  valor da opção obrigatório
        },
      },
    ],
  },
  {
    versionKey: false,
  }
)

const cardapioSchema = mongoose.model('cardapio', cardapio)

module.exports = cardapioSchema
