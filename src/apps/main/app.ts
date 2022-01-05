import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import VueI18n from 'vue-i18n'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import options from '@/languages'
import virnectComponents from '@/plugins/virnectComponents'

import '@virnect/ui-assets/css/base.old.css'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(virnectComponents)
Vue.use(VueCompositionApi)

const i18n = new VueI18n(options)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
})
