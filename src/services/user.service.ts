import withAuthorization from '@/config/withAuthorization.config'
import { IUser } from '@/types/redux/userSlice.types'
import { AxiosInstance } from 'axios'

class UserService {
	private readonly api: AxiosInstance

	constructor(api: AxiosInstance) {
		this.api = api
	}

	async getUser() {
		const { data } = await this.api.get<IUser>('users/me')

		return data
	}
}

export default new UserService(withAuthorization)
