// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Blog from './Blog'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import filter from './filters/filters'

// Vue.filter('marked', markdown)
Vue.prototype.$http = axios
Vue.prototype.moment = moment

Vue.filter('time', val => {
  return moment(val).format('L')
})
Vue.filter('year', val => {
  return moment(val).year()
})
Vue.filter('title', filter.getTitle)
// Vue.filter('excerpt', filter.getExcerpt)

Vue.prototype.markdown = filter.markdown
Vue.prototype.getExcerpt = filter.getExcerpt
Vue.prototype.getContent = filter.getContent
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Blog/>',
  components: { Blog }
})
