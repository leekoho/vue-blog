import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import Login from './components/Login'
import Admin from './components/Admin'
import store from './store'

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

const router = new Router({
  mode: 'history',
  linkActiveClass: 'menu__link--active',
  scrollBehavior,
  routes: [{
    path: '/admin/login',
    name: 'Login',
    component: Login
  }, {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requireAuth: true
    }
  }]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (window.localStorage.token) {
      console.log(window.localStorage.token)
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.token // 全局设定header的token验证，注意Bearer后有个空格
      next()
    } else {
      next('/admin/login')
    }
  } else {
    next()
  }
})

// http response 拦截器
Axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          // store.commit('')
          router.replace({
            path: '/admin/login'
          })
          store.state.toastrConf.show = true
          store.state.toastrConf.type = 'error'
          store.state.toastrConf.message = 'tokan已过期，请重新登录'
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  })
export default router
