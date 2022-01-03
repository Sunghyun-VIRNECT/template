import { createApp } from 'vue'
import App from '~/App'
import store from '~/stores'
import router from '~/routers'
import i18n from '~/languages'
import '@virnect/ui-assets/css/base.old.css'
import * as Virnect from '@virnect/components'
import '../assets/scss/_components.scss'

const app = createApp(App)

app.use(store).use(router).use(i18n).mount('#app')

app.config.globalProperties.$store = store
app.config.globalProperties.$router = router

// add VirnectComponents
Object.entries(Virnect).map(([componentName, component]) => {
  app.component(`Virnect${componentName}`, component)
})
