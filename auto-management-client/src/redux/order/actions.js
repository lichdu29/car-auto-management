import { createAsyncThunk } from '@reduxjs/toolkit'
import orderService from '../../api/orderService'
import { notification } from 'antd'

export const getAllOrderThunk = createAsyncThunk(
  'order/getAllOrder',
  async (payload, thunkAPI) => {
    try {
      const { page, search, limit } = thunkAPI.getState().order
      const data = await orderService.getAllOrders({
        page: payload?.page || page,
        limit: payload?.limit || limit,
        search: payload?.search || search,
        status: payload?.status || {},
        paymentStatus: payload?.paymentStatus || {},
        customerId: payload?.customerId || {},
      })
      return data
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to get orders',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)

export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (id, thunkAPI) => {
    try {
      const data = await orderService.getOrderById(id)
      return data
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to get order details',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)

export const updateOrderThunk = createAsyncThunk(
  'order/updateOrder',
  async (payload, thunkAPI) => {
    try {
      const res = await orderService.updateOrder(payload.id, payload.data)
      notification.success({
        message: res?.message || 'Update order successfully',
      })
      const { page, search, limit } = thunkAPI.getState().order
      thunkAPI.dispatch(getAllOrderThunk({ page, search, limit }))
      return res
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to update order',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)

export const deleteOrderThunk = createAsyncThunk(
  'order/deleteOrder',
  async (id, thunkAPI) => {
    try {
      const res = await orderService.deleteOrder(id)
      notification.success({
        message: res?.message || 'Delete order successfully',
      })
      const { page, search, limit } = thunkAPI.getState().order
      thunkAPI.dispatch(getAllOrderThunk({ page, search, limit }))
      return id
    } catch (err) {
      notification.error({
        message: err.message || 'Failed to delete order',
      })
      thunkAPI.rejectWithValue(err)
      throw err
    }
  }
)
