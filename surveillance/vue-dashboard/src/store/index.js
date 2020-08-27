import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import computed from './computed.js'
Vue.use(Vuex)

export default new Vuex.Store({
	state: state,
	getters: getters,
	mutations: mutations,
	actions: {},
	modules: {}
})
