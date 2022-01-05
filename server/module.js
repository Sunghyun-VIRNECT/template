const https = require('https')
const http = require('http')
const path = require('path')
const fs = require('fs')
const logger = require('@virnect/logger')
const config = require('./config')

var ServerModule = (function () {
  'use strict'

  let instance

  let VIRNECT_ENV
  let SSL_ENV
  let PORT
  //@TODO : update part!!
  async function start(app) {
    VIRNECT_ENV = process.env.VIRNECT_ENV || 'production'
    SSL_ENV = config.getAsString('SSL_ENV') || 'public'
    PORT = config.getPort() || 8886

    return new Promise(function (resolve, reject) {
      process.on('uncaughtException', onProcessError)

      const options = {
        key: fs.readFileSync(path.join('./ssl/virnect.key')),
        cert: fs.readFileSync(path.join('./ssl/virnect.crt')),
      }

      try {
        if (SSL_ENV === 'public') {
          instance = http.createServer(app)
        } else {
          instance = https.createServer(options, app)
        }

        instance
          .on('listening', onListening)
          .on('close', onClose)
          .on('error', onError)

        instance.listen(PORT)

        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  function onError(err) {
    switch (err.code) {
      case 'EACCES':
        logger.error(`${err.code}`, 'ERROR')
        logger.error(`requires elevated privileges.`, 'ERROR')
        process.exit(1)
        break
      case 'EADDRINUSE':
        logger.error(`${err.code}`, 'ERROR')
        logger.error(`port ${PORT} already in use.`, 'ERROR')
        process.exit(1)
        break
      default:
        throw err
    }
  }

  function onClose(err) {
    logger.error(`server is closing...`, 'CLOSE')
    logger.error(`${err}`, 'CLOSE')
  }

  function onListening() {
    logger.info(`server is running...`, 'LISTENING')
    logger.ipInfo(`${PORT}`, 'LISTENING')
    logger.info(`VIRNECT_ENV: ${VIRNECT_ENV}`, 'LISTENING')
    logger.info(`SSL_ENV: ${SSL_ENV}`, 'LISTENING')

    const urls = config.getUrls()
    delete urls.runtime
    Object.keys(urls).forEach(key => {
      logger.info(`${key.toUpperCase()}: ${urls[key]}`, 'LISTENING')
    })
  }

  function onProcessError(err) {
    logger.error(`${err.message}`, 'PROCESS_ERROR')
    logger.error(`${err.stack}`, 'PROCESS_ERROR')
    process.exit(1)
  }

  return {
    start: start,
  }
})()

module.exports = ServerModule
