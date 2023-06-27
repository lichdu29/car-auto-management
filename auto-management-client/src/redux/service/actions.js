import { createAsyncThunk } from '@reduxjs/toolkit'
import customerService from '../../api/customerService'
import { notification } from 'antd'
import serviceService from '../../api/serviceService'

export const getAllServiceThunk = createAsyncThunk(
  'service/getAllServices',
  async (payload, thunkAPI) => {
    try {
      const { page, search, limit, type } = thunkAPI.getState().service
      const data = await serviceService.getAllServices({
        page: payload?.page || page,
        search: payload?.search || search,
        limit: payload?.limit || limit,
        type: payload?.type || type,
      })
      const { data: services } = data
      data.data = services.reduce((acc, item) => {
        if (acc[item.type]) acc[item.type].push(item)
        else acc[item.type] = [item]
        return acc
      }, {})
      return data
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to get services',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)

export const getServiceTypesThunk = createAsyncThunk(
  'customer/getServiceTypes',
  async (id, thunkAPI) => {
    try {
      const data = await serviceService.getAllTypes()
      return data
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to get service types',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)

export const updateServiceThunk = createAsyncThunk(
  'customer/updateService',
  async (payload, thunkAPI) => {
    try {
      const res = await serviceService.updateService(payload)
      notification.success({
        message: res?.message || 'Update customer successfully',
      })
      return thunkAPI.dispatch(getAllServiceThunk())
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to update service',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)

export const deleteCustomerThunk = createAsyncThunk(
  'customer/deleteCustomer',
  async (id, thunkAPI) => {
    try {
      const res = await customerService.deleteCustomer(id)
      notification.success({
        message: res?.message || 'Delete customer successfully',
      })
      const { page, search, limit } = thunkAPI.getState().customer
      return thunkAPI.dispatch(getAllServiceThunk({ page, search, limit }))
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to delete customer',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)
