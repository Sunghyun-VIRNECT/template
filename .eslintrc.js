require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  parserOptions: {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  extends: [
    'eslint:recommended',
    '@virnect/eslint-config/vue',
    '@vue/eslint-config-typescript'
  ],
  env: {
    node: true,
    es6: true,
    jest: true
  },
  
}