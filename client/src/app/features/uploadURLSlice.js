import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  url: '',
}

export const uploadURLSlice = createSlice({
  name: 'URL',
  initialState,
  uploadURL: {
    increment: (state, payload) => {
      state.url = payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { uploadURL } = uploadURLSlice.actions

export default uploadURLSlice.reducer