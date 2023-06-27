import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../api/authService'
import { success, error } from '../notification/notificationSlice'

export const logInThunk = createAsyncThunk(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await authService.logIn({ username, password })
      localStorage.setItem('_at', data.accessToken)
      localStorage.setItem('_rt', data.refeshToken)
      const currentUser = await authService.getProfile()

      if (currentUser) {
        thunkAPI.dispatch(success('Login successfully'))
      }

      return currentUser
    } catch (err) {
      thunkAPI.dispatch(error('Username or password is not available'))
    }
  }
)

export const getProfileThunk = createAsyncThunk(
  'auth/getProfile',
  async (thunkAPI) => {
    try {
      const currentUser = await authService.getProfile()
      return currentUser
    } catch (error) {
      thunkAPI.dispatch(error('Something went wrong'))
    }
  }
)
