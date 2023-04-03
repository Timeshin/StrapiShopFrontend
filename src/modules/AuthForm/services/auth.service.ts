import fetchInstance from '@/config/fetchInstance.config'
import {
	ILoginDataRequest,
	IAuthDataResponse,
	IRegisterDataRequest
} from '@/modules/AuthForm/types/service/authService.types'
import { AxiosInstance } from 'axios'

class AuthService {
	private readonly api: AxiosInstance

	constructor(api: AxiosInstance) {
		this.api = api
	}

	async register(registerData: IRegisterDataRequest) {
		const { data } = await this.api.post<IAuthDataResponse>('auth/local/register', registerData)

		return data
	}

	async login(loginData: ILoginDataRequest) {
		const { data } = await this.api.post<IAuthDataResponse>('auth/local', loginData)

		return data
	}
}

export default new AuthService(fetchInstance)
