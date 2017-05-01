/**
 * Created by leekoho on 2017/4/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import * as actions from './actions'
import * as getters from './getter'
import api from '../api'
import md5 from 'md5'

Vue.use(Vuex)

const state = {
  toastrConf: {
    show: false,
    type: 'success',
    message: ''
  },
  sidebarWidth: '220px',
  articlesList: [],
  publishArticlesList: [],
  unPublishArticlesList: [],
  updateType: 'article',
  disType: true,
  currentArticle: [],
  defaultMarkdown: 'Title\n---\n\nExcerpt\n\n<!--more-->\n\n',
  token: ''
}

const mutations = {
  closeToastr (state) {
    state.toastrConf.show = false
  },
  toggleSidebar (state) {
    state.sidebarWidth === 0 ? state.sidebarWidth = '220px' : state.sidebarWidth = 0
  },
  getArticlesList (state) {
    api.getArticlesList().then(res => {
      state.articlesList = res.data.data.article
      state.currentArticle = state.articlesList[0]
    })
  },
  selectArticle (state, article) {
    state.currentArticle = article
    state.updateType = 'article'
  },
  updateTextarea (state, val) {
    state.currentArticle.markdown = val
  },
  addArticle (state) {
    api.createArticle(state.defaultMarkdown).then(res => {
      state.toastrConf.show = true
      state.toastrConf.type = 'success'
      state.toastrConf.message = '文章添加成功'
    }).catch(() => {
      state.toastrConf.show = true
      state.toastrConf.type = 'error'
      state.toastrConf.message = '文章添加失败'
    })
  },
  deleteArticle (state, id) {
    let confirm = window.confirm('皇上，三思而后行啊！！！')
    if (confirm) {
      api.deleteArticle(id).then(res => {
        state.currentArticle.display = true
        state.toastrConf.show = true
        state.toastrConf.type = 'success'
        state.toastrConf.message = '删除成功'
      }).catch(() => {
        state.toastrConf.show = true
        state.toastrConf.type = 'error'
        state.toastrConf.message = '删除失败'
      })
    }
  },
  publishArticle (state, id) {
    api.publishArticle(id).then(res => {
      state.currentArticle.display = true
      state.toastrConf.show = true
      state.toastrConf.type = 'success'
      state.toastrConf.message = '发布成功'
    }).catch(() => {
      state.toastrConf.show = true
      state.toastrConf.type = 'error'
      state.toastrConf.message = '发布失败'
    })
  },
  unPublishArticle (state, id) {
    api.unPublishArticle(id).then(res => {
      state.currentArticle.display = false
      state.toastrConf.show = true
      state.toastrConf.type = 'success'
      state.toastrConf.message = '撤回成功'
    }).catch(() => {
      state.toastrConf.show = true
      state.toastrConf.type = 'error'
      state.toastrConf.message = '撤回失败'
    })
  },
  updateArticle (state, id) {
    if (state.updateType === 'article') {
      api.updateArticle(id, {
        markdown: state.currentArticle.markdown,
        updateTime: Date.now()
      }).then(() => {
        state.toastrConf.show = true
        state.toastrConf.type = 'success'
        state.toastrConf.message = '更新成功'
      }).catch(() => {
        state.toastrConf.show = true
        state.toastrConf.type = 'error'
        state.toastrConf.message = '更新失败'
      })
    } else {
      api.updateAbout(state.currentArticle).then(res => {
        state.toastrConf.show = true
        state.toastrConf.type = 'success'
        state.toastrConf.message = '更新成功'
      }).catch(() => {
        state.toastrConf.show = true
        state.toastrConf.type = 'error'
        state.toastrConf.message = '更新失败'
      })
    }
  },
  login (state, data) {
    data.password = md5(data.password)
    api.login(data).then(res => {
      window.localStorage.token = res.data.token
      router.push('/admin')
      state.toastrConf.show = true
      state.toastrConf.type = 'success'
      state.toastrConf.message = '登录成功'
    }).catch(() => {
      state.toastrConf.show = true
      state.toastrConf.type = 'error'
      state.toastrConf.message = '登录失败'
    })
  },
  loginOut (state) {
    window.localStorage.token = ''
    router.push({
      name: 'Login'
    })
    state.toastrConf.show = true
    state.toastrConf.type = 'success'
    state.toastrConf.message = '退出成功'
  },
  selectAbout (state) {
    state.updateType = 'about'
    api.getAbout().then(res => {
      state.currentArticle = res.data.data
    }).catch(() => {
      state.toastrConf.show = true
      state.toastrConf.type = 'error'
      state.toastrConf.message = '数据获取失败'
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
