import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BaiduMap from 'vue-baidu-map'

import vueJsonp from 'vue-jsonp'
Vue.use(vueJsonp)

import './plugins/axios'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//引用less的index
import './assets/css/index.less';

Vue.use(BaiduMap, {
  /* 申请的百度密钥，可以在百度地图官网申请 */
  ak: 'j4jlLzNRv34Yx9hG6nMFacw704zjlCmL'
})

Vue.config.productionTip = false

new Vue({
	router,
	store,
	components: {
		App
	},
	render: h => h(App)
}).$mount('#app')
