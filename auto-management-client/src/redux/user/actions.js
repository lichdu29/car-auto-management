import { createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../api/userService'
import { notification } from 'antd'

export const getAllUserThunk = createAsyncThunk(
  'user/getAllUser',
  async (payload, thunkAPI) => {
    try {
      const { page, search, limit } = thunkAPI.getState().user
      const data = await userService.getAllUsers({
        page: payload?.page || page,
        limit: payload?.limit || limit,
        search: payload?.search || search,
      })
      return data
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to get users',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (id, thunkAPI) => {
    try {
      const data = await userService.getUserById(id)
      return data
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to get User details',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (payload, thunkAPI) => {
    try {
      const res = await userService.updateUser(payload.id, payload.data)
      notification.success({
        message: res?.message || 'Update user successfully',
      })
      const { page, search, limit } = thunkAPI.getState().user
      thunkAPI.dispatch(getAllUserThunk({ page, search, limit }))
      return res
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to update user',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)

export const deleteUserThunk = createAsyncThunk(
  'user/deleteUser',
  async (id, thunkAPI) => {
    try {
      const res = await userService.deleteUser(id)
      notification.success({
        message: res?.message || 'Delete User successfully',
      })
      const { page, search, limit } = thunkAPI.getState().user
      thunkAPI.dispatch(getAllUserThunk({ page, search, limit }))
      return id
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to delete User',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)
