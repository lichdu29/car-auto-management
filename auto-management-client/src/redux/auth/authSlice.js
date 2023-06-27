import { createSlice } from '@reduxjs/toolkit'
import { getProfileThunk, logInThunk } from './actions'

const initialState = {
  isLoading: true,
  currentUser: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoading: (state, payload) => {
      state.isLoading = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(logInThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.currentUser = action.payload
    })
    builder.addCase(logInThunk.rejected, (state) => {
      state.isLoading = false
      state.currentUser = null
    })

    builder.addCase(getProfileThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.currentUser = action.payload
    })
    builder.addCase(getProfileThunk.rejected, (state) => {
      state.isLoading = false
      state.currentUser = null
    })
  },
})
export const { setLoading } = authSlice.actions
export default authSlice
