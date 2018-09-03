import Routes from './router/router'
import App from './App.vue'

import './style/index.scss'

import axios from 'axios'

import store from './store/store'

import errorWatch from 'pv-err-watch'


const VueRouter = window.VueRouter
const Vue = window.Vue

Vue.use(VueRouter)

Vue.prototype.$axios = axios

errorWatch
  .config(Vue, '**.**.com', { 'topic': '0630' }, {
    url: ['./static/js/vue.min.js']
  })
  .htmlError()

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
