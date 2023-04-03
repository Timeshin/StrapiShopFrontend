const isEmilValid = (email: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	return emailRegex.test(email)
}

export default isEmilValid
