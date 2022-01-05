import { I18nOptions, LocaleMessages } from 'vue-i18n'

const files = require.context('.', true, /index.ts$/)
const modules: LocaleMessages = {}
const exceptName = './index.ts'

files.keys().forEach(key => {
  if (key === exceptName) return
  modules[key.replace(/(\.\/|\/index\.ts)/g, '')] = files(key).default
})

const options: I18nOptions = {
  locale: 'ko',
  fallbackLocale: 'en',
  messages: modules,
}

export default options
