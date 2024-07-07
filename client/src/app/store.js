import { configureStore } from '@reduxjs/toolkit';
import  uploadURLSlice  from './features/uploadURLSlice';


export const store = configureStore({
  reducer: {
    uploadURLSlice
  },
})