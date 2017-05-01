const mongoose = require('mongoose')

const aboutSchema = mongoose.Schema({
  markdown: { type: String, required: true },
  updateTime: { type: Date, default: Date.now },
}, { versionKey: false })

module.exports = mongoose.model('about', aboutSchema)
