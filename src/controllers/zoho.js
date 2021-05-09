const fetch = require('node-fetch')
const { CONFIG } = require('../config')

const ZOHO_CONSOLE = 'vp-expo-main-console'

const currentToken = {}
let cache = {}

const removeExpiredCache = () => {
  const now = new Date().getTime()
  for (let key of Object.keys(cache)) {
    if (now > cache[key].expirationDate) delete cache[key]
  }
}
setInterval(removeExpiredCache, 60 * 60 * 1000) // 1h

const getAccessToken = async () => {
  if (currentToken && currentToken.expirationDate > new Date())
    return currentToken.token

  try {
    const zohoTokenUrl = `https://accounts.zoho.com/oauth/v2/token?grant_type=refresh_token&client_id=${process.env.ZOHO_CLIENT_ID}&client_secret=${process.env.ZOHO_CLIENT_SECRET}&refresh_token=${process.env.ZOHO_REFRESH_TOKEN}`
    const tokenResponse = await fetch(zohoTokenUrl, {
      method: 'POST',
      body: null,
    })
    const jsonResponse = await tokenResponse.json()
    if (jsonResponse.access_token) {
      currentToken.token = jsonResponse.access_token
      currentToken.expirationDate = new Date()
      currentToken.expirationDate.setSeconds(
        currentToken.expirationDate.getSeconds() + jsonResponse.expires_in - 60
      ) // 60 secondes security
      return currentToken.token
    }
    console.log('Did not receive a token : ' + tokenResponse.status)
  } catch (error) {
    console.log(error)
  }
}

const getFetchOptions = async overrides => {
  const token = await getAccessToken()
  const ret = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }
  if (overrides) return Object.assign(ret, overrides)
  return ret
}

const sendToZoho = async uri => {
  try {
    if (cache[uri]) return cache[uri].value

    let doPagination =
      uri.indexOf('limit=') === -1 && uri.indexOf('from=') === -1

    const options = await getFetchOptions()
    let from = 0
    let url = process.env.ZOHO_CREATOR_URL + uri
    url +=
      (url.indexOf('?') === -1 ? '?' : '&') +
      'limit=' +
      CONFIG.ZOHO_PAGINATION_LIMIT
    let zohoResult = await fetch(url, options)
    let result = await zohoResult.json()
    const value = result
    while (
      doPagination &&
      result.data &&
      result.data.length === CONFIG.ZOHO_PAGINATION_LIMIT
    ) {
      // We are reached the zoho pagination limit
      from += CONFIG.ZOHO_PAGINATION_LIMIT
      zohoResult = await fetch(url + '&from=' + from, options)
      result = await zohoResult.json()
      if (result.code === 3000 && result.data)
        value.data = value.data.concat(result.data)
    }

    if (value.code === 3000) {
      // Save in cache
      cache[uri] = {
        value,
        expirationDate:
          new Date().getTime() + CONFIG.ZOHO_CACHE_DURATION_HOURS * 3600 * 1000,
      }
    }
    return value
  } catch (error) {
    console.log(error)
  }
}

// // USED IN YE FOR OPTICIAN AND CUSTOMER

// // An optician has a valid token
// const getUserRole = async token => {
//   if (!token) return 'consumer'

//   const employees = await sendToZoho(`/${ZOHO_CONSOLE}/report/All_Employees`)
//   const employee = employees.data.filter(e => e.ID === token)[0]
//   if (!employee) return null // Wrong token!
//   return 'optician'
// }

// const getSetting = async (country, setting) => {
//   const settings = await sendToZoho(
//     `/${ZOHO_CONSOLE}/report/${country}_Store_Settings`
//   )
//   return settings.data[0][setting]
// }

const clearCache = () => (cache = {})

module.exports = {
  sendToZoho,
  clearCache,
  // getSetting,
  // getUserRole,
  ZOHO_CONSOLE,
}
