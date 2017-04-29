/**
 * Created by leekoho on 2017/4/29.
 */
import User from '../models/user'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import config from '../config'

export async function initUser() {
  let user = await User.find().catch(err => {
    console.log(err)
  })
  if (user.length === 0) {
    user = User.create({
        nickname: 'leekoho',
        username: 'leekoho',
        password: md5(config.admin.password),
        createTime: Date.now()
    })
  }
}

export async function login(ctx) {
  const {username, password} = ctx.request.body
  let user = await User.findOne({
    username: username
  })
  if (user) {
    if (user.password === password) {
      const token = jwt.sign({
        uid: user._id,
        name: user.username,
        exp: Math.floor(Date.now() / 1000) + 24 * 3600 // 有效时间24个小时
      }, config.jwt.secret)

      ctx.body = {
        success: true,
        uid: user._id,
        name: user.username,
        token: token
      }
    } else {
      ctx.throw(401, '密码错误')
    }
  } else {
    ctx.throw(404, '用户名不存在')
  }
}
