const crypto = require('crypto')

class RequestError extends Error {
  constructor(message, status = 400, ...params) {
    super(...params)
    this.status = status
    this.message = message
  }
}
module.exports.RequestError = RequestError

module.exports.clientErrorHandler = async (req, res, next) => {
  try {
    await next()
  } catch (err) {
    // Maybe log the error here?
    console.log(err)

    let responseBody
    let responseStatus

    // some errors will have .status however this is not a guarantee
    responseStatus = err.status || 500
    responseBody = {
      code: responseStatus,
      type: 'ERROR',
      response: { message: err.message.message },
    }

    ctx.type = 'application/json'
    ctx.status = responseStatus
    ctx.body = responseBody

    // since we handled this manually we'll
    // want to delegate to the regular app
    // level error handling as well so that
    // centralized logging still functions correctly.
    ctx.app.emit('error', err, this)
  }
}

module.exports.createHash = (string, key, algorithm = 'sha256') => {
  // const algorithm = 'sha256'
  const hmac = crypto.createHmac(algorithm, key)
  hmac.update(string)
  return hmac.digest('hex')
}
