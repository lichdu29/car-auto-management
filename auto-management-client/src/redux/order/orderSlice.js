import { createSlice } from '@reduxjs/toolkit'
import {
  deleteOrderThunk,
  getAllOrderThunk,
  getOrderDetails,
  updateOrderThunk,
} from './actions'

const initialState = {
  isLoading: false,
  orderDetail: null,
  orders: [],
  page: 1,
  limit: 10,
  search: '',
  totalCount: 0,
}

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    updateQuery: (state, { search }) => {
      state.search = search
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOrderThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllOrderThunk.fulfilled, (state, action) => {
      state.isLoading = false
      const { data, limit, page, totalCount } = action.payload
      state.orders = data
      state.totalCount = totalCount
      state.page = page
      state.limit = limit
    })
    builder.addCase(getAllOrderThunk.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(getOrderDetails.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.isLoading = false
      state.orderDetail = action.payload
    })
    builder.addCase(getOrderDetails.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(updateOrderThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateOrderThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.orderDetail = action.payload
    })
    builder.addCase(updateOrderThunk.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(deleteOrderThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteOrderThunk.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(deleteOrderThunk.rejected, (state) => {
      state.isLoading = false
    })
  },
})
export const { updateQuery } = orderSlice.actions
export default orderSlice
