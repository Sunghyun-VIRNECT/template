const express = require('express')
const route = require('./route')
const app = express()
const server = require('./server/module')
const path = require('path')
const compression = require('compression')

app.use(compression())

app.use(express.static(path.join(__dirname, 'dist')))
app.use('/static', express.static(path.join(__dirname, 'static')))

app.use(route)

server
  .start(app)
  .then(function () {})
  .catch(function (e) {
    console.log(e)
  })
