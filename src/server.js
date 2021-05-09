require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const app = express()
const { clientErrorHandler } = require('./utils/extras')
const router = require('./router')
const { version } = require('../package.json')

app.use(helmet())
app.use(bodyParser.json())
app.use(cors())

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

app

  // .use(compression({ filter: shouldCompress }))
  // Error Handler
  .use(clientErrorHandler)

  // API Routes
  .use('/api/v1', router.APIv1Router)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`You and eye ${version} is waiting on port ${port}`))
