import { IUser } from '@/types/redux/userSlice.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
	user: IUser | null
	isAuth: boolean
}

const initialState: InitialState = {
	user: null,
	isAuth: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser | null>) => {
			state.user = action.payload
			state.isAuth = !!action.payload
			console.log(action.payload)
		}
	}
})

const { actions, reducer } = userSlice

export const { setUser } = actions

export default reducer
