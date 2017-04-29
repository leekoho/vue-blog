/**
 * Created by leekoho on 2017/4/23.
 */
const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  markdown: { type: String, required: true },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
  display: { type: Boolean, default: false },
  visits: { type: Number, default: 0 },
}, { versionKey: false })

module.exports = mongoose.model('article', articleSchema)
