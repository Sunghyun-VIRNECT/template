export default {
  namespaced: true,
  state: () => ({
    isMobile: false,
  }),
  getters: {
    isMobile(state) {
      return state.isMobile
    },
  },
  mutations: {
    updateState(state, payload) {
      state.isMobile = payload
    },
  },
  actions: {
    async changeMobile({ commit, state }, payload) {
      commit('updateState', payload)
      console.log(state.isMobile)
    },
  },
}
