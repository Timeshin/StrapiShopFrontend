import { IProduct } from '@/modules/ProductList'
import { IStatus } from '@/types/common.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartProducts } from './cart.thunks'

interface InitialState {
	cartProducts: IProduct[] | null
	status: IStatus
}

const initialState: InitialState = {
	cartProducts: null,
	status: { status: 'idle' }
}

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setCartProducts: (state, { payload }: PayloadAction<IProduct[]>) => {
			state.cartProducts = payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getCartProducts.pending, (state) => {
			state.status = { status: 'loading' }
		}),
			builder.addCase(getCartProducts.fulfilled, (state, { payload }) => {
				state.cartProducts = payload
				state.status = { status: 'success' }
			}),
			builder.addCase(getCartProducts.rejected, (state) => {
				state.status = { status: 'error' }
			})
	}
})

const { reducer, actions } = productsSlice

export const { setCartProducts } = actions

export default reducer
