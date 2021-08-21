const bcrypt = require('bcryptjs')

const mongoose = require('../database/mongo')

const Empresa = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      required: [true, 'Nome da empresa é obrigatório'],
      trim: true,
      default: true,
    },
    name: {
      type: String,
      required: [true, 'Nome da empresa é obrigatório'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Nome do usuário é obrigatório'],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Senha é obrigatório'],
      trim: true,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      select: false,
      required: true,
      trim: true,
      default: false,
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

Empresa.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)

  this.password = hash

  next()
})

const empresaSchema = mongoose.model('empresa', Empresa)

module.exports = empresaSchema
