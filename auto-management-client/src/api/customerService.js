import axiosInstance from '.'

const customerService = {
  createCustomer: async (payload) => {
    return axiosInstance.post('/api/customers', payload)
  },

  getAllCustomers: async ({ page, limit, search }) => {
    return axiosInstance.get('/api/customers', {
      params: { page, limit, search },
    })
  },

  getCustomerById: async (id) => {
    return axiosInstance.get(`/api/customers/${id}`)
  },

  updateCustomer: async (id, payload) => {
    return axiosInstance.put(`/api/customers/${id}`, payload)
  },

  deleteCustomer: async (id) => {
    return axiosInstance.delete(`/api/customers/${id}`)
  },
}

export default customerService
