const express = require('express')
const orderController = require('../controllers/orderController.js')
const verifyAccessToken = require('../middlewares/verifyAccessToken.js')

const route = express.Router()

route.use(verifyAccessToken)

route.post('/', orderController.create)
route.delete('/:id', orderController.delete)
route.put('/:id', orderController.update)
route.get('/:id', orderController.get)
route.get('/', orderController.list)

module.exports = route
