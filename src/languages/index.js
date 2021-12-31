import { createI18n } from 'vue-i18n'
const files = require.context('.', true, /index.js$/)
const modules = {}
const exceptName = './index.js'

files.keys().forEach(key => {
  if (key === exceptName) return
  modules[key.replace(/(\.\/|\/index\.js)/g, '')] = files(key).default
})

// keyname
modules.key = {}
;(function recursion(parent, name, obj) {
  const list = Array.isArray(obj)
    ? obj.map((val, index) => [index, val || ''])
    : Object.entries(obj)
  list.forEach(([key, val]) => {
    if (typeof val != 'object') {
      parent[key] = name + key
    } else {
      parent[key] = {}
      recursion(parent[key], name + key + '.', val)
    }
  })
})(modules.key, '', modules.ko)

export default createI18n({
  legacy: false,
  locale: 'ko',
  fallbackLocale: 'en',
  messages: modules,
  globalInjection: true,
})
