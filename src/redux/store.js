import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appslice'

export const store = configureStore({
    reducer: {appReducer},
  })

  