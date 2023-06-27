import { createSlice } from '@reduxjs/toolkit'
import {
  deleteCarThunk,
  getAllCarThunk,
  getCarDetails,
  updateCarThunk,
} from './actions'

const initialState = {
  isLoading: false,
  carDetail: null,
  cars: [],
  page: 1,
  limit: 10,
  search: '',
  totalCount: 0,
}

const carSlice = createSlice({
  name: 'car',
  initialState: initialState,
  reducers: {
    updateQuery: (state, { search }) => {
      state.search = search
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCarThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllCarThunk.fulfilled, (state, action) => {
      state.isLoading = false
      const { data, limit, page, totalCount } = action.payload
      state.cars = data
      state.totalCount = totalCount
      state.page = page
      state.limit = limit
    })
    builder.addCase(getAllCarThunk.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(getCarDetails.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCarDetails.fulfilled, (state, action) => {
      state.isLoading = false
      state.carDetail = action.payload
    })
    builder.addCase(getCarDetails.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(updateCarThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateCarThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.carDetail = action.payload
      const index = state.cars.findIndex(
        (car) => car._id === action.payload._id
      )
      const { oders, ...res } = action.payload
      state.cars[index] = { ...state.cars[index], ...res }
    })
    builder.addCase(updateCarThunk.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(deleteCarThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteCarThunk.fulfilled, (state, action) => {
      state.isLoading = false
      const index = state.cars.findIndex((car) => car._id === action.payload)
      state.cars.splice(index, 1)
    })
    builder.addCase(deleteCarThunk.rejected, (state) => {
      state.isLoading = false
    })
  },
})
export const { updateQuery } = carSlice.actions
export default carSlice
