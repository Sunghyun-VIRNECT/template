import * as Virnect from '@virnect/components'
import '@/assets/scss/_components.scss'
export default {
  install(Vue: any) {
    Object.entries(Virnect).map(([componentName, component]) => {
      Vue.component(`Virnect${componentName}`, component)
    })
  },
}
