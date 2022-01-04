import { createApp } from 'vue'
import App from '~/App'
import store from '~/stores'
import router from '~/routers'
import i18n from '~/languages'
import virnectComponents from '~/plugins/virnectComponents'

const app = createApp(App)

app.use(store).use(router).use(i18n).use(virnectComponents).mount('#app')
