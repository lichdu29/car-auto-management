const carService = require('../service/carService.js')

class CarController {
  // [POST] api/cars
  async create(req, res, next) {
    return carService.createCar(req, res, next)
  }

  // [GET] api/cars
  async list(req, res, next) {
    return carService.getAllCar(req, res, next)
  }

  // [GET] api/cars/:id
  async get(req, res, next) {
    return carService.getCarById(req, res, next)
  }

  // [PUT] api/cars/:id
  async update(req, res, next) {
    return carService.updateCar(req, res, next)
  }

  // [DELETE] api/cars/:id
  async delete(req, res, next) {
    return carService.deleteCar(req, res, next)
  }
}

module.exports = new CarController()
