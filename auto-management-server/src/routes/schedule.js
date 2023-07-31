const express = require('express')
const scheduleController = require('../controllers/scheduleController.js')
// const verifyAccessToken = require('../middlewares/verifyAccessToken.js')
// const checkRole = require('../middlewares/checkRole.js')

const route = express.Router()

route.post('/', scheduleController.create)
route.get('/', scheduleController.list)
route.put('/:id', scheduleController.update)
route.delete('/:id', scheduleController.delete)
module.exports = route
