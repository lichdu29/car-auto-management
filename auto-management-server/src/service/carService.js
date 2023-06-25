const Car = require('../models/Car')
const Customer = require('../models/Customer')
const { handleError, validateAndUpdateDocument } = require('../utils')

const CarService = {
  createCar: async (req, res) => {
    const {
      plateNumber,
      brand,
      model,
      year,
      isRepaired,
      isAtWorkShop,
      customer,
      repairs,
    } = req.body
    try {
      const existedPlateNumber = await Car.findOne({ plateNumber })
      if (existedPlateNumber)
        return res.status(401).json({ message: 'The plate number is existing' })

      const newCar = new Car({
        plateNumber,
        brand,
        model,
        year,
        isRepaired,
        isAtWorkShop,
        customer,
        repairs,
      })
      const savedCar = await newCar.save()

      // update customer
      const existedCustomer = await Customer.findById(customer.customerId)
      existedCustomer.cars.push({
        carId: savedCar._id,
        plateNumber: savedCar.plateNumber,
      })
      await existedCustomer.save()

      res.status(201).json(savedCar)
    } catch (err) {
      handleError(err, res, 'Failed to create Car')
    }
  },

  getAllCar: async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''

    const skip = (page - 1) * limit

    const searchQuery = {
      $or: [
        { plateNumber: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
      ],
    }

    try {
      const data = await Car.find(searchQuery)
        .select('-orders')
        .skip(skip)
        .limit(limit)
        .exec()

      const totalCount = await Car.countDocuments(searchQuery)
      res.json({
        page,
        limit,
        totalCount,
        data,
      })
    } catch (err) {
      return res.status(500).json({ message: 'Failed to retrieve Cars' })
    }
  },

  getCarById: async (req, res) => {
    const carId = req.params.id

    try {
      const car = await Car.findById(carId)

      if (!car) {
        return res.status(404).json({ message: 'Car not found' })
      }

      res.json(car)
    } catch (err) {
      return res.status(500).json({ message: 'Failed to retrieve Car' })
    }
  },

  updateCar: async (req, res) => {
    const carId = req.params.id

    try {
      const car = await Car.findById(carId)
      const prevPlateNumber = car.plateNumber
      if (!car) {
        return res.status(404).json({ message: 'Car not found' })
      }
      if (prevPlateNumber !== req.body.plateNumber) {
        const isAnotherCar = await Car.findOne({
          plateNumber: req.body.plateNumber,
        })
        if (isAnotherCar)
          return res.status(400).json({ message: 'Plate number is exiting' })
      }

      const excludedFields = ['customer', 'orders']
      const updatedCar = await validateAndUpdateDocument(
        car,
        req.body,
        excludedFields
      )
      res.json(updatedCar)

      // update customer
      if (prevPlateNumber === updatedCar.plateNumber) return
      const customerId = updatedCar.customer.customerId
      const customer = await Customer.findById(customerId)
      const indexCar = customer.cars.findIndex(
        (car) => car.carId.toString() === carId
      )
      customer.cars[indexCar].plateNumber = updatedCar.plateNumber
      await customer.save()
    } catch (err) {
      handleError(err, res, 'Failed to update Car')
    }
  },

  deleteCar: async (req, res) => {
    const carId = req.params.id
    try {
      const deletedCar = await Car.findByIdAndDelete(carId)
      if (!deletedCar) {
        return res.status(404).json({ message: 'Car not found' })
      }
      res.json({
        message: 'Car deleted successfully',
      })

      // update customer
      const customerId = deletedCar.customer.customerId
      if (!customerId) return
      const customer = await Customer.findById(customerId)
      customer.cars = customer.cars.filter(
        (car) => car.carId.toString() !== carId
      )
      await customer.save()
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete Car' })
    }
  },
}

module.exports = CarService
