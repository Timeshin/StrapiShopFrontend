import productMiddleware from '@/modules/ProductList/redux/products.middleware'
import { configureStore } from '@reduxjs/toolkit'
import { stores } from './slices'

export const store = configureStore({
	reducer: stores,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productMiddleware])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
