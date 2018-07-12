import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Routes from './router/router'
import App from './App.vue'

import './style/index.scss'

import axios from 'axios'

import store from './store/store'

const VueRouter = window.VueRouter
const Vue = window.Vue

Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.prototype.$axios = axios

const router = new VueRouter({
  routes: Routes
})
/* eslint no-new: 0 */
new Vue({
  router: router,
  store,
  el: '#app',
  render: h => h(App)
})
