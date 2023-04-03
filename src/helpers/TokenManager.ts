const TokenManager = {
	getLocalAccessToken() {
		return localStorage.getItem('accessToken')
	},
	updateLocalAccessToken(token: string) {
		localStorage.setItem('accessToken', token)
	},
	deleteToken() {
		localStorage.removeItem('accessToken')
	}
}

export default TokenManager
