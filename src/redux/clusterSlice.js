import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  selectedTags: [],
  visibleClusters: [],
  clusterOnHover: '',
  clusterOnClick: '',
}

export const clusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {
    updateSelectedTags: (state, action) => {
      // state.value += 1
      state.selectedTags = JSON.parse(JSON.stringify(action.payload));
      // console.log(state.selectedTags, 'hi from redux')
    },
    updateVisibleClusters: (state, action) => {
      state.visibleClusters = JSON.parse(JSON.stringify(action.payload));
      // console.log(state.visibleClusters, 'hi from redux')
    },
    updateClusterOnHover: (state, action) => {
      state.clusterOnHover = JSON.parse(JSON.stringify(action.payload));
      console.log(state.clusterOnHover, 'hi from redux')
    },
    updateClusterOnClick: (state, action) => {
      state.clusterOnClick = JSON.parse(JSON.stringify(action.payload));
      console.log(state.clusterOnClick, 'hi from redux')
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { updateSelectedTags, updateVisibleClusters, updateClusterOnHover, updateClusterOnClick } = clusterSlice.actions

export default clusterSlice.reducer