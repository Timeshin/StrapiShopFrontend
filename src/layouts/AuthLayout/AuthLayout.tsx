import { useEffect } from 'react'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'
import TokenManager from '@/helpers/TokenManager'
import { getUser } from '@/redux/thunks/user.thunks'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

import { Loader } from '@/components'

const AuthLayout = () => {
	const naviagte = useNavigate()
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(({ authStore }) => authStore.isAuth)
	const isAuthPage = useMatch('/auth')
	const isLoading = useAppSelector(({ authStore }) => authStore.status.status === 'loading')
	const jwtToken = TokenManager.getLocalAccessToken()

	useEffect(() => {
		if (isAuth && !isAuthPage) return

		if (isAuth && isAuthPage) {
			naviagte('/', { replace: true })
			return
		}

		if (!jwtToken) {
			naviagte('/auth', { replace: true })
		}

		dispatch(getUser())
	}, [dispatch, isAuth, isAuthPage, jwtToken, naviagte])

	if (isLoading) return <Loader />

	return (
		<>
			<Outlet />
		</>
	)
}

export default AuthLayout
