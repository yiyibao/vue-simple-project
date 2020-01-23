/* eslint-disable */ 
import _ from 'loadsh'
import axios from 'axios'
import Element from 'element-ui'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import errorWatch from 'pv-err-watch'

import Routes from './router/router'
import App from './App.vue'
import store from './store/store'

import './style/index.scss'

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
