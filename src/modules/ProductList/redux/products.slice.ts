import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../../../types/services/productsService.types'

interface InitialState {
	products: IProduct[] | null
	isConnectedToSocket: boolean
}

const initialState: InitialState = {
	products: null,
	isConnectedToSocket: false
}

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<IProduct[] | null>) => {
			state.products = action.payload
		},
		connectToSocket: (state) => {
			state.isConnectedToSocket = true
		}
	}
})

const { actions, reducer } = productsSlice

export const { setProducts, connectToSocket } = actions

export default reducer
