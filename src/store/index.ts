import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import isMobile from './mobile'

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { isMobile },
})
