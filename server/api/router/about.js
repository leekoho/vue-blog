import * as $ from '../../controllers/about'
import verify from '../../middleware/verify'

export default async(router) => {
  router.get('/about', $.getAbout)
  router.patch('/about', verify, $.updateAbout)
}
