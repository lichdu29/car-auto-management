import { createSlice } from '@reduxjs/toolkit'
import {
  deleteCustomerThunk,
  getAllServiceThunk,
  getServiceTypesThunk,
  updateServiceThunk,
} from './actions'

const initialState = {
  isLoading: false,
  types: [],
  services: [],
  page: 1,
  limit: 10,
  search: '',
  totalCount: 0,
}

const serviceSlice = createSlice({
  name: 'service',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllServiceThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllServiceThunk.fulfilled, (state, action) => {
      state.isLoading = false
      const { data, limit, page, totalCount } = action.payload
      state.services = data
      state.totalCount = totalCount
      state.page = page
      state.limit = limit
    })
    builder.addCase(getAllServiceThunk.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(getServiceTypesThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getServiceTypesThunk.fulfilled, (state, action) => {
      state.isLoading = false
      const { serviceTypes } = action.payload
      state.types = serviceTypes
    })
    builder.addCase(getServiceTypesThunk.rejected, (state) => {
      state.isLoading = false
    })

    // builder.addCase(getCustomerDetails.pending, (state) => {
    //   state.isLoading = true
    // })
    // builder.addCase(getCustomerDetails.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.customerDetail = action.payload
    // })
    // builder.addCase(getCustomerDetails.rejected, (state) => {
    //   state.isLoading = false
    // })

    builder.addCase(updateServiceThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateServiceThunk.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(updateServiceThunk.rejected, (state) => {
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
export default serviceSlice
