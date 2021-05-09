const router = require('express').Router()
const {
  sendCartEmail,
} = require('../controllers/cart');
const { getUserRole } = require('../controllers/zoho');

router.post('/', async (req, res) => {
  const { userId = '0', products, retailerInfo, cartId, scope } = req.body
  if (!products || products.length < 1 || !userId || !retailerInfo) {
    res.json({ error: true }).status(400);
  }
  const userRole = await getUserRole(req.query.token);
  //  const cart = await addToCart({ cartId, userId, products, retailerInfo })
  const mailerResponse = await sendCartEmail({ products, retailerInfo, scope, userRole })
  res.json({ mailerResponse }).status(200)
})


module.exports = router
