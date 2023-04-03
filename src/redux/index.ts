import { configureStore } from '@reduxjs/toolkit'
import { stores } from './slices'

export const store = configureStore({
	reducer: stores
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
