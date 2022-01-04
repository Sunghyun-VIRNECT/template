const env = process.env.VIRNECT_ENV
const configServer = process.env.CONFIG_SERVER

const axios = require('axios')

let envConfig = {}
let urlConfig = {}
let sslConfig = {}

const localIp = 'localhost'

const localUrls = {
  www: `https://${localIp}:9010`,
  console: `https://${localIp}:8883`,
  // api: 'https://192.168.6.7:8073',
  api: 'https://192.168.6.3:8073',
  accout: 'https://localhost:8822',
  workstation: `https://${localIp}:8878`,
  download: 'https://localhost:8833',
  remote: 'https://localhost:8886',
  pay: `https://${localIp}:7070`,
  minio: 'https://192.168.13.64:4545',
  env: 'local',
  timeout: 30000,
  ssl: 'private',
}
class Config {
  constructor() {}

  get envConfig() {
    return envConfig
  }
  get urlConfig() {
    return urlConfig
  }
  get sslConfig() {
    return sslConfig
  }

  async init() {
    const { data } = await axios.get(
      `${configServer}/web-url/${env === 'local' ? 'develop' : env}`,
    )
    // const res = await axios.get(
    //   `${configServer}/login-web/${env === 'local' ? 'develop' : env}`,
    // )
    Object.entries(data.propertySources[0].source).map(([key, v]) => {
      if (!/ssl./.test(key)) {
        urlConfig[key] = v
      } else {
        sslConfig[key.slice(4)] = v
      }
    })
    // envConfig = res.data.propertySources[0].source
    // urlConfig.timeout = res.data.propertySources[0].source.API_TIMEOUT
    // urlConfig.ssl = res.data.propertySources[0].source.SSL_ENV
    urlConfig.env = data.profiles[0]

    if (env === 'local') {
      urlConfig = localUrls
      urlConfig.env = 'local'
      console.log(urlConfig)
      console.log(envConfig)
    }
    return this
  }
}

const config = new Config()
module.exports = config
