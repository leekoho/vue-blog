/**
 * Created by leekoho on 2017/4/23.
 */
import * as $ from '../../controllers/article'
import verify from '../../middleware/verify'

export default async(router) => {
  router.get('/articles', $.getArticlesList)
  router.post('/articles', verify, $.createArticle)
  router.get('/articles/:id', $.getArticle)
  router.delete('/articles/:id', verify,$.deleteArticle)
  router.patch('/articles/:id', verify,$.updateArticle)
}





