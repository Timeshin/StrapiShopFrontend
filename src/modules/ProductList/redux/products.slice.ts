import { IStatus } from '@/types/common.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../../../types/services/productsService.types'
import { getProducts } from './products.thunks'

interface InitialState {
	products: IProduct[] | null
	status: IStatus
}

const initialState: InitialState = {
	products: null,
	status: { status: 'idle' }
}

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<IProduct[] | null>) => {
			state.products = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state) => {
			state.status = { status: 'loading' }
		}),
			builder.addCase(getProducts.fulfilled, (state, { payload }) => {
				state.products = payload
				state.status = { status: 'success' }
			}),
			builder.addCase(getProducts.rejected, (state) => {
				state.status = { status: 'error' }
			})
	}
})

const { actions, reducer } = productsSlice

export const { setProducts } = actions

export default reducer
