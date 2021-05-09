// Routes
const zoho = require('./routes/zoho')
const cart = require('./routes/cart')

const routerInstance = () => {
  const APIv1Router = require('express').Router()

  APIv1Router.use('/creator', zoho);
  APIv1Router.use('/cart', cart);

  return {
    APIv1Router,
  }
}

module.exports = routerInstance()
