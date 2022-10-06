import { configureStore } from "@reduxjs/toolkit";
import clusterReducer from './clusterSlice';

export default configureStore({
  reducer: {
    cluster: clusterReducer
  }
});