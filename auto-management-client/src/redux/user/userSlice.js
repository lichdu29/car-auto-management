import { createSlice } from '@reduxjs/toolkit'
import {
  deleteUserThunk,
  getAllUserThunk,
  getUserDetails,
  updateUserThunk,
} from './actions'

const initialState = {
  isLoading: false,
  userDetail: null,
  users: [],
  page: 1,
  limit: 10,
  search: '',
  totalCount: 0,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateQuery: (state, { search }) => {
      state.search = search
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUserThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllUserThunk.fulfilled, (state, action) => {
      state.isLoading = false
      const { data, limit, page, totalCount } = action.payload
      state.users = data
      state.totalCount = totalCount
      state.page = page
      state.limit = limit
    })
    builder.addCase(getAllUserThunk.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(getUserDetails.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.isLoading = false
      state.userDetail = action.payload
    })
    builder.addCase(getUserDetails.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(updateUserThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.userDetail = action.payload
    })
    builder.addCase(updateUserThunk.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(deleteUserThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(deleteUserThunk.rejected, (state) => {
      state.isLoading = false
    })
  },
})
export const { updateQuery } = userSlice.actions
export default userSlice
