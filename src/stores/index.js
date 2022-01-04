import { createStore } from 'vuex'
import mobile from './mobile'
import message from './message'

export default createStore({
  modules: {
    message,
    mobile,
  },
})
