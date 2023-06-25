const express = require('express')
const carController = require('../controllers/carController.js')
const verifyAccessToken = require('../middlewares/verifyAccessToken.js')

const route = express.Router()

route.use(verifyAccessToken)

route.post('/', carController.create)
route.delete('/:id', carController.delete)
route.put('/:id', carController.update)
route.get('/:id', carController.get)
route.get('/', carController.list)

module.exports = route
