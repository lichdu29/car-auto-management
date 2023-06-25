const express = require('express')
const serviceController = require('../controllers/serviceController.js')
const verifyAccessToken = require('../middlewares/verifyAccessToken.js')
const checkRole = require('../middlewares/checkRole.js')

const route = express.Router()

route.post('/', verifyAccessToken, checkRole, serviceController.create)
route.delete('/:id', verifyAccessToken, checkRole, serviceController.delete)
route.put('/:id', verifyAccessToken, checkRole, serviceController.update)
route.put('/', verifyAccessToken, checkRole, serviceController.updateMany)
route.get('/types', serviceController.getTypes)
route.get('/:id', serviceController.get)
route.get('/', serviceController.list)
module.exports = route
