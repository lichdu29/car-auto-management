import { createSlice } from '@reduxjs/toolkit'
import {
  deleteCustomerThunk,
  getAllCustomerThunk,
  getCustomerDetails,
  updateCustomerThunk,
} from './actions'

const initialState = {
  isLoading: false,
  customerDetail: null,
  customers: [],
  page: 1,
  limit: 10,
  search: '',
  totalCount: 0,
}

const customerSlice = createSlice({
  name: 'customer',
  initialState: initialState,
  reducers: {
    updateQuery: (state, { search }) => {
      state.search = search
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCustomerThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllCustomerThunk.fulfilled, (state, action) => {
      state.isLoading = false
      const { data, limit, page, totalCount } = action.payload
      state.customers = data
      state.totalCount = totalCount
      state.page = page
      state.limit = limit
    })
    builder.addCase(getAllCustomerThunk.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(getCustomerDetails.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCustomerDetails.fulfilled, (state, action) => {
      state.isLoading = false
      state.customerDetail = action.payload
    })
    builder.addCase(getCustomerDetails.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(updateCustomerThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateCustomerThunk.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(updateCustomerThunk.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(deleteCustomerThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteCustomerThunk.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(deleteCustomerThunk.rejected, (state) => {
      state.isLoading = false
    })
  },
})
export const { updateQuery } = customerSlice.actions
export default customerSlice
