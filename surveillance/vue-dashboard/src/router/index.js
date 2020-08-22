import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'charts',
		component : (resolve) => require(['../views/charts.vue'],resolve),
		meta: {
			footer: true,
			server: true,
			login: true,
		}
	}
]

const router = new VueRouter({
	hash: true,
	base: process.env.BASE_URL, 
	routes
}) 
export default router
