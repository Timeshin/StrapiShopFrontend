import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
	isCartPopupShow: boolean
}

const initialState: InitialState = {
	isCartPopupShow: false
}

export const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		setIsCartPopupShow: (state, { payload }: PayloadAction<boolean>) => {
			state.isCartPopupShow = payload
		}
	}
})

const { actions, reducer } = modalsSlice

export const { setIsCartPopupShow } = actions

export default reducer
