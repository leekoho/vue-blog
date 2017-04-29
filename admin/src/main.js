// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/index'
import filter from './filter/article'

import router from './router'
import axios from 'axios'
import App from './App'

Vue.use(Vuex)
Vue.filter('title', filter.getTitle)
Vue.prototype.getContent = filter.getContent

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  Vuex,
  template: '<App/>',
  components: { App }
})
