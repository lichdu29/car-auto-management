import axiosInstance from '.'

const carService = {
  createCar: async (payload) => {
    return axiosInstance.post('/api/cars', payload)
  },

  getAllCars: async ({ page, limit, search }) => {
    return axiosInstance.get('/api/cars', {
      params: { page, limit, search },
    })
  },

  getCarById: async (id) => {
    return axiosInstance.get(`/api/cars/${id}`)
  },

  updateCar: async (id, payload) => {
    return axiosInstance.put(`/api/cars/${id}`, payload)
  },

  deleteCar: async (id) => {
    return axiosInstance.delete(`/api/cars/${id}`)
  },
}

export default carService
