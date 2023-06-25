import axiosInstance from '.'

const serviceService = {
  getAllTypes: async () => {
    return axiosInstance.get('/api/services/types')
  },

  createService: async (payload) => {
    return axiosInstance.post('/api/services', payload)
  },

  getAllServices: async ({ page, limit, search, type }) => {
    return axiosInstance.get('/api/services', {
      params: { page, limit, search, type },
    })
  },

  getCustomerById: async (id) => {
    return axiosInstance.get(`/api/services/${id}`)
  },

  updateService: async (payload) => {
    return axiosInstance.put(`/api/services/`, payload)
  },

  deleteService: async (id) => {
    return axiosInstance.delete(`/api/services/${id}`)
  },
}

export default serviceService
