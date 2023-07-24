const Order = require('../models/Order')
const Car = require('../models/Car')
const Customer = require('../models/Customer')
const {
  handleError,
  validateAndUpdateDocument,
  formatDate,
} = require('../utils')

const OrderService = {
  createOrder: async (req, res) => {
    try {
      const newOrder = new Order(req.body)
      const savedOrder = await newOrder.save()
      const { name, customer, car, startDate, endDate, totalCost } = savedOrder
      // update customer
      const updatedCustomer = await Customer.updateOne(
        { _id: customer.customerId },
        {
          $push: {
            orders: { orderId: savedOrder._id, name: name, date: startDate },
          },
        }
      )
      // update car
      const updatedCar = await Car.updateOne(
        { _id: car.carId },
        {
          $push: {
            repairs: {
              orderId: savedOrder._id,
              startDate,
              endDate,
              cost: totalCost,
            },
          },
        }
      )
      res.status(201).json(savedOrder, updatedCustomer, updatedCar)
    } catch (err) {
      handleError(err, res, 'Failed to create Order')
    }
  },

  getAllOrder: async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''
    const status = req.query.status || null
    const paymentStatus = req.query.paymentStatus || null
    const customerId = req.query.customerId
    const skip = (page - 1) * limit

    const queryCustomerId = customerId
      ? {
          'customer.customerId': customerId,
        }
      : {}
    const searchQuery = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { 'car.plateNumber': { $regex: search, $options: 'i' } },
        { 'customer.customerName': { $regex: search, $options: 'i' } },
      ],
      status: status ? status : { $in: ['WORKING', 'DONE', 'PRE_ORDER'] },
      'payment.paymentStatus': paymentStatus
        ? paymentStatus
        : { $in: ['PAID', 'UNPAID'] },

      ...queryCustomerId,
    }

    try {
      const data = await Order.find(searchQuery)
        .select('-services')
        .skip(skip)
        .limit(limit)
        .exec()

      const totalCount = await Order.countDocuments(searchQuery)
      res.json({
        page,
        limit,
        totalCount,
        data,
      })
    } catch (err) {
      return res.status(500).json({ message: 'Failed to retrieve Orders' })
    }
  },

  getOrderById: async (req, res) => {
    const orderId = req.params.id

    try {
      const order = await Order.findById(orderId)

      if (!order) {
        return res.status(404).json({ message: 'Order not found' })
      }

      res.json(order)
    } catch (err) {
      return res.status(500).json({ message: 'Failed to retrieve Order' })
    }
  },

  updateOrder: async (req, res) => {
    const orderId = req.params.id
    const { name, startDate, endDate, totalCost } = req.body
    try {
      const order = await Order.findById(orderId)
      if (!order) {
        return res.status(404).json({ message: 'Order not found' })
      }

      const excludedFields = ['customer', 'car']
      if (req.body.endDate) {
        req.body.endDate = formatDate(req.body.endDate)
      }
      if (req.body.startDate) {
        req.body.startDate = formatDate(req.body.startDate)
      }
      const updatedOrder = await validateAndUpdateDocument(
        order,
        {
          ...req.body,
        },
        excludedFields
      )
      res.json(updatedOrder)

      // update customer
      if (name === updatedOrder.name && startDate === updatedOrder.startDate)
        return
      await Customer.updateOne(
        { _id: updatedOrder.customer.customerId, 'orders.orderId': orderId },
        {
          $set: {
            'orders.$.name': updatedOrder.name,
            'orders.$.date': updatedOrder.startDate,
          },
        }
      )

      // update car
      if (
        startDate === updatedOrder.startDate &&
        endDate === updatedOrder.endDate &&
        totalCost === updatedOrder.totalCost
      )
        return
      await Car.updateOne(
        { _id: updatedOrder.car.carId, 'repairs.orderId': orderId },
        {
          $set: {
            'repairs.$.startDate': updatedOrder.startDate,
            'repairs.$.endDate': updatedOrder.endDate,
            'repairs.$.cost': updatedOrder.totalCost,
          },
        }
      )
    } catch (err) {
      console.log(err)
      handleError(err, res, 'Failed to update order')
    }
  },

  deleteOrder: async (req, res) => {
    const orderId = req.params.id
    try {
      const deletedOrder = await Order.findByIdAndDelete(orderId)
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' })
      }

      // update customer
      const customerId = deletedOrder.customer.customerId
      if (!customerId) return
      const customer = await Customer.findById(customerId)
      customer.orders = customer.orders.filter(
        (order) => order.orderId.toString() !== orderId
      )
      await customer.save()

      // update car
      const carId = deletedOrder.car.carId
      if (!carId) return
      const car = await Car.findById(carId)
      if (!car) return
      car.repairs = car.repairs.filter((repair) => {
        return repair.orderId.toString() !== orderId
      })
      await car.save()
      res.json({
        message: 'Order deleted successfully',
      })
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete Order' })
    }
  },
}

module.exports = OrderService
