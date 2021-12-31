import { createApp } from 'vue'
import App from '~/App'
import store from '~/stores'
import router from '~/routers'
import i18n from '~/languages'

const app = createApp(App)

app.use(store).use(router).use(i18n).mount('#app')

app.config.globalProperties.$store = store
app.config.globalProperties.$router = router
