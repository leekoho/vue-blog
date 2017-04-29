
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
import koa from 'koa'
import config from './config'
import mongose from 'mongoose'
import api from './api'
import middleware from './middleware/index'

const { host, database, auth } = config.mongodb
mongose.connect(`mongodb://${host}/${database}`, auth)
mongose.connection.on('error', console.error.bind(console, 'connection error:'))

// 创建一个Koa对象表示web app本身:
const app = new koa()

app.use(middleware())
// onerror(app)

app.use(api())

// 在端口3000监听:
app.listen(config.app.port)
console.log(`app started at port ${config.app.port}...`)
