const mongoose = require('../database/mongo')

const listItems = new mongoose.Schema([
  {
    list: {
      type: String,
    },
    externalBuyerReference: {
      type: String,
    },
    externalSellerReference: {
      type: String,
    },
    buyerMobilePhone: {
      type: String,
    },
    buyerName: {
      type: String,
    },
    buyerCnpj: {
      type: String,
    },
    sellerName: {
      type: String,
    },
    warehouse: {
      type: String,
    },
    productReferences: {
      type: Array,
    },
    startDate: {
      type: Date,
    },
    expiresIn: {
      type: Date,
    },
    externalListPriceReference: {
      type: String,
    },
    orderToken: {
      type: String,
    },
    name: {
      type: String,
    },
    version: {
      type: Number,
    },
    createdAt: {
      type: Date,
    },
    lastModified: {
      type: Date,
    },
    active: {
      type: Boolean,
    },
    _class: {
      type: String,
    },
  },
  {
    versionKey: false,
  },
])

const listItemsSchema = mongoose.model('list', listItems)

module.exports = listItemsSchema
