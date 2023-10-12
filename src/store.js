import { configureStore } from '@reduxjs/toolkit'
import counterslice from './slices/counterslice'


export default configureStore({
  reducer: {
    counter: counterslice
  },
})