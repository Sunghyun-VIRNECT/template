const files = require.context('.', false, /\.json$/)
const modules = {}

files.keys().forEach(key => Object.assign(modules, files(key)))

export default modules
