interface Init {
  isMobile: Boolean
}

export default {
  state: {
    isMobile: false,
  },
  getters: {
    isMobile(state: Init) {
      return state.isMobile
    },
  },
  mutations: {
    IS_MOBILE(state: Init, value: Boolean) {
      state.isMobile = value
    },
  },
}
