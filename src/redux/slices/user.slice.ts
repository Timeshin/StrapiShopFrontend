import { IStatus } from '@/types/common.types'
import { IUser } from '@/types/redux/userSlice.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUser } from '@/redux/thunks/user.thunks'

interface InitialState {
	user: IUser | null
	isAuth: boolean
	status: IStatus
}

const initialState: InitialState = {
	user: null,
	isAuth: false,
	status: { status: 'loading' }
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<IUser | null>) => {
			state.user = payload
			state.isAuth = !!payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getUser.pending, (state) => {
			state.status = { status: 'loading' }
		}),
			builder.addCase(getUser.fulfilled, (state, { payload }) => {
				state.user = payload
				state.isAuth = !!payload
				state.status = { status: 'success' }
			}),
			builder.addCase(getUser.rejected, (state) => {
				state.status = { status: 'error' }
			})
	}
})

const { actions, reducer } = userSlice

export const { setUser } = actions

export default reducer
