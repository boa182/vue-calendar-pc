import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/layout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
