import { createAsyncThunk } from '@reduxjs/toolkit'
import carService from '../../api/carService'
import { notification } from 'antd'

export const getAllCarThunk = createAsyncThunk(
  'car/getAllcar',
  async (payload, thunkAPI) => {
    try {
      const { page, search, limit } = thunkAPI.getState().car
      const data = await carService.getAllCars({
        page: payload?.page || page,
        search: payload?.search || search,
        limit: payload?.limit || limit,
      })
      return data
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to get cars',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)

export const getCarDetails = createAsyncThunk(
  'car/getcarDetails',
  async (id, thunkAPI) => {
    try {
      const data = await carService.getCarById(id)
      return data
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to get car details',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)

export const updateCarThunk = createAsyncThunk(
  'car/updateCar',
  async (payload, thunkAPI) => {
    try {
      const res = await carService.updateCar(payload.id, payload.data)
      notification.success({
        message: res?.message || 'Update car successfully',
      })
      return res
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to update car',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)

export const deleteCarThunk = createAsyncThunk(
  'car/deleteCar',
  async (id, thunkAPI) => {
    try {
      const res = await carService.deleteCar(id)
      notification.success({
        message: res?.message || 'Delete car successfully',
      })
      // const { page, search, limit } = thunkAPI.getState().car
      // return thunkAPI.dispatch(getAllCarThunk({ page, search, limit }))
      return id
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to delete car',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)
