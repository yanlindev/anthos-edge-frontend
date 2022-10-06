import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedTags: {},
}

export const clusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {
    updateSelectedTags: (state) => {
      // state.value += 1
      console.log('hi from redux')
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { updateSelectedTags } = clusterSlice.actions

export default clusterSlice.reducer