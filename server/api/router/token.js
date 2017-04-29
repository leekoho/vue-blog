/**
 * Created by leekoho on 2017/4/29.
 */
import * as $ from '../../controllers/token.js'

export default async(router) => {
  $.initUser()
  router.post('/token', $.login)
}
