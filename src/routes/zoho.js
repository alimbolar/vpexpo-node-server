const router = require('express').Router()
const {
  sendToZoho, clearCache, getUserRole
} = require('../controllers/zoho');

const HTTP_CACHE_DURATION = 2 * 3600; // 2h

router.get('/clearCache', (req, res) => {
  clearCache();
  res.status(200).send('Cache cleared');
});

router.get('/*', async (req, res) => {
  let uri = req.url;
  if (uri.indexOf('?') > -1) uri = uri.substring(0, uri.indexOf('?')); // Remove query string

  const userRole = await getUserRole(req.query.token);

  const jsonResult = await sendToZoho(uri);
  if (jsonResult.code === 3000) {
    let data = jsonResult.data;
    if (uri.indexOf('All_Eyewear_Products') > -1 && userRole !== 'optician') {
      // For security purpose : remove Dealer_Price
      data = data.map(p => {
        const newProduct = Object.assign({}, p);
        Object.keys(p).filter(k => k.endsWith('_Dealer_Price')).forEach(k => delete newProduct[k]);
        return newProduct;
      });
    }
    res.status(200).set('Cache-Control', 'public, max-age=' + HTTP_CACHE_DURATION).json(data);
  }
  else res.status(500).json(jsonResult);
});

module.exports = router;
