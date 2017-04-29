import Vue from 'vue'
import Router from 'vue-router'
import List from './components/List'
import Post from './components/Post'
import About from './components/About'
import Archive from './components/Archive'
import Error from './components/Error'

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

export default new Router({
  mode: 'history',
  linkActiveClass: 'menu__link--active',
  scrollBehavior,
  routes: [
    {
      path: '/posts',
      name: 'List',
      component: List
    }, {
      path: '/posts/:postId',
      name: 'Post',
      component: Post,
      meta: { scrollToTop: true }
    }, {
      path: '/about',
      name: 'About',
      component: About,
      meta: { scrollToTop: true }
    }, {
      path: '/archive',
      name: 'Archive',
      conponent: Archive,
      meta: { scrollToTop: true }
    }, {
      path: '/error',
      name: 'Error',
      component: Error
    }, {
      path: '*',
      redirect: { name: 'List' }
    }
  ]
})
