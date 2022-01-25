const mongoose = require('mongoose')
const schemas = mongoose.Schema({
  societe: String,
  creation: Number,
  pays: String,
})

module.exports = mongoose.model('constructeurs', schemas)
