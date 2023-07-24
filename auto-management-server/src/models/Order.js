const mongoose = require('mongoose')

const STATUS = { working: 'WORKING', done: 'DONE', preOrder: 'PRE_ORDER' }
const PAYMENTSTATUS = { paid: 'PAID', unpaid: 'UNPAID' }

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    customer: {
      customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
      },
      customerName: {
        type: String,
        required: true,
      },
    },
    car: {
      carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'car',
      },
      plateNumber: {
        type: String,
        required: true,
      },
    },
    services: [
      {
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'services',
        },
        name: {
          type: String,
          required: true,
        },
        cost: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: STATUS,
      default: STATUS.working,
      required: true,
    },
    payment: {
      paymentStatus: {
        type: String,
        enum: PAYMENTSTATUS,
        default: PAYMENTSTATUS.unpaid,
        required: true,
      },
      payAtTime: { type: Date },
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    totalCost: { type: Number, required: true },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
