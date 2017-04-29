/**
 * Created by leekoho on 2017/4/25.
 */
const config = {
  app: {
    port: process.env.Port || 3000,
    baseApi: '/api'
  },
  mongodb: {
    host: 'localhost',
    port: 27017,
    database: 'blog',
    auth: {
      user: '',
      pwd: ''
    }
  },
  jwt: {
    secret: 'leekoho'
  },
  admin: {
    password: '123456'
  }
}
export default config
