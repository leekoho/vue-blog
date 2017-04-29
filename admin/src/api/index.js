/**
 * Created by leekoho on 2017/4/29.
 */

import Axios from 'axios'

export default {
  createArticle (markdown) {
    return Axios.post('/api/articles', {
      markdown: markdown
    })
  },

  getArticlesList () {
    return Axios.get(`/api/articles?display=all`)
  },

  publishArticle (id) {
    return Axios.patch(`/api/articles/${id}`, { display: true })
  },

  unPublishArticle (id) {
    return Axios.patch(`/api/articles/${id}`, { display: false })
  },

  updateArticle (id, data) {
    return Axios.patch(`/api/articles/${id}`, data)
  },

  deleteArticle (id) {
    return Axios.delete(`/api/articles/${id}`)
  },

  getArticle (id) {
    return Axios.get(`/api/articles/${id}`)
  },

  login (data) {
    return Axios.post('/api/token', data)
  }
}
