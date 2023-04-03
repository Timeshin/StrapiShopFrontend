import TokenManager from '@/helpers/TokenManager'
import { store } from '@/store'
import { setUser } from '@/actions/userSlice.action'
import axios from 'axios'

const withAuthorization = axios.create({
	baseURL: process.env.API_URL
})

withAuthorization.interceptors.request.use(
	(config) => {
		const newConfig = { ...config }
		const token = TokenManager.getLocalAccessToken()
		if (token === 'undefined') {
			TokenManager.deleteToken()
		}

		if (token) {
			newConfig.headers.Authorization = `Bearer ${token}`
		} else {
			throw new axios.Cancel('Not Logined(not have access token)')
		}

		return newConfig
	},
	(error) => Promise.reject(error)
)

withAuthorization.interceptors.response.use(
	(res) => res,
	async (err) => {
		if (!err.config) {
			return Promise.reject(err)
		}

		if (err.response) {
			if (err.response.data.status === 401) {
				TokenManager.deleteToken()
				store.dispatch(setUser(null))
			}
		}

		return Promise.reject(err)
	}
)

export default withAuthorization
