import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { setUser } from '@/actions/userSlice.action'
import TokenManager from '@/helpers/TokenManager'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import UserService from '@/services/user.service'

import { Loader } from '@/components'

import classes from './AuthLayout.module.scss'

const AuthLayout = () => {
	const [isLoading, setIsLoading] = useState(false)
	const naviagte = useNavigate()
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(({ authStore }) => authStore.isAuth)
	const jwtToken = TokenManager.getLocalAccessToken()

	useEffect(() => {
		if (isAuth) {
			naviagte('/', { replace: true })
			return
		}

		if (jwtToken) {
			setIsLoading(true)
			UserService.getUser()
				.then((user) => {
					dispatch(setUser(user))
				})
				.finally(() => setIsLoading(false))
		}

		naviagte('/auth', { replace: true })
	}, [dispatch, isAuth, jwtToken, naviagte])

	if (isLoading) return <Loader />

	return (
		<div className={classes.layout}>
			<Outlet />
		</div>
	)
}

export default AuthLayout
