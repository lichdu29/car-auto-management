import { createAsyncThunk } from '@reduxjs/toolkit'
import customerService from '../../api/customerService'
import { notification } from 'antd'

export const getAllCustomerThunk = createAsyncThunk(
  'customer/getAllCustomer',
  async (payload, thunkAPI) => {
    try {
      const { page, search, limit } = thunkAPI.getState().customer
      const data = await customerService.getAllCustomers({
        page: payload?.page || page,
        search: payload?.search || search,
        limit: payload?.limit || limit,
      })
      return data
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to get customers',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)

export const getCustomerDetails = createAsyncThunk(
  'customer/getCustomerDetails',
  async (id, thunkAPI) => {
    try {
      const data = await customerService.getCustomerById(id)
      return data
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to get customer details',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)

export const updateCustomerThunk = createAsyncThunk(
  'customer/updateCustomer',
  async (payload, thunkAPI) => {
    try {
      console.log('pauloader update customer =>>>', payload)
      const res = await customerService.updateCustomer(payload.id, payload.data)
      notification.success({
        message: res?.message || 'Update customer successfully',
      })
      return thunkAPI.dispatch(getCustomerDetails(payload.id))
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to update customer',
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
      return thunkAPI.dispatch(getAllCustomerThunk({ page, search, limit }))
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to delete customer',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)
