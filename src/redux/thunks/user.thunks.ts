import UserService from '@/services/user.service'
import { createAsyncThunk } from '@reduxjs/toolkit'

const getUser = createAsyncThunk('user/getUser', async () => {
	const response = await UserService.getUser()

	return response
})

export { getUser }
