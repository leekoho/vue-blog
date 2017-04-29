/**
 * Created by leekoho on 2017/4/29.
 */
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  nickname: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
}, {versionKey: false})

module.exports = mongoose.model('user', userSchema)

