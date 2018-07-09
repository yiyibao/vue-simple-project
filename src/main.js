import Vue from 'vue'

import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter)
Vue.use(ElementUI)

import Routes from './router/router'
import App from './App.vue'

import './style/index.scss'

import axios from 'axios'

Vue.prototype.$axios = axios

import store from './store/store'

const router = new VueRouter({
	routes: Routes
	//   mode: 'history'
// 	 linkActiveClass: 'active'
})

new Vue({
	router: router,
	store,
	el: '#app',
	render: h => h(App)
})
