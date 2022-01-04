import * as Virnect from '@virnect/components'
import 'assets/scss/_components.scss'

// Object.entries(Virnect).map(([componentName, component]) => {
//   Vue.component(`Virnect${componentName}`, component)
// })
export default {
  install(Vue) {
    Object.entries(Virnect).map(([componentName, component]) => {
      Vue.component(`Virnect${componentName}`, component)
    })
  },
}
