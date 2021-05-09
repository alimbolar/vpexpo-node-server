// Routes
const zoho = require('./routes/zoho')

const routerInstance = () => {
  const APIv1Router = require('express').Router()

  APIv1Router.use('/creator', zoho);

  return {
    APIv1Router,
  }
}

module.exports = routerInstance()
