import axiosInstance from '.'

const orderService = {
  createOrder: async (payload) => {
    return axiosInstance.post('/api/orders', payload)
  },

  getAllOrders: async ({
    page,
    limit,
    search,
    status,
    paymentStatus,
    customerId,
  }) => {
    return axiosInstance.get('/api/orders', {
      params: { page, limit, search, status, paymentStatus, customerId },
    })
  },

  getOrderById: async (id) => {
    return axiosInstance.get(`/api/orders/${id}`)
  },

  updateOrder: async (id, payload) => {
    return axiosInstance.put(`/api/orders/${id}`, payload)
  },

  deleteOrder: async (id) => {
    return axiosInstance.delete(`/api/orders/${id}`)
  },
}

export default orderService
