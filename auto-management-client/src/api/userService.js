import axiosInstance from '.'

const userService = {
  createUser: async (payload) => {
    return axiosInstance.post('/api/users', payload)
  },

  getAllUsers: async ({ page, limit, search }) => {
    return axiosInstance.get('/api/users', {
      params: { page, limit, search },
    })
  },

  getUserById: async (id) => {
    return axiosInstance.get(`/api/users/${id}`)
  },

  updateUser: async (id, payload) => {
    return axiosInstance.put(`/api/users/${id}`, payload)
  },

  deleteUser: async (id) => {
    return axiosInstance.delete(`/api/users/${id}`)
  },
}

export default userService
