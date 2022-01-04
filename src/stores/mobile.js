export default {
  namespaced: true,
  state: {
    isMobile: false,
  },
  getters: {
    isMobile(state) {
      return state.isMobile
    },
  },
  mutations: {
    IS_MOBILE(state, value) {
      state.isMobile = value
    },
  },
  actions: {
    async IS_MOBILE({ commit }, isMobile) {
      commit('IS_MOBILE', isMobile)
    },
  },
}
