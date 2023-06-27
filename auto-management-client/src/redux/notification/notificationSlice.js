import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: null,
  description: '',
  random: Math.random(),
}

const notificationSlice = createSlice({
  name: 'notif',
  initialState: initialState,
  reducers: {
    success: (state, action) => {
      state.type = 'success'
      state.description = action.payload
      state.random = Math.random()
    },
    error: (state, action) => {
      state.type = 'error'
      state.description = action.payload
      state.random = Math.random()
    },
  },
})

export const { success, error } = notificationSlice.actions

export default notificationSlice
