import { FormEvent, useState } from 'react'
import { FormTypes } from './AuthForm.types'
import authFormData from './AuthForm.meta'
import submitFormHandler from '@/helpers/submitFormHandler'
import { IAuthDataResponse, ILoginDataRequest, IRegisterDataRequest } from '../../types/service/authService.types'
import AuthService from '../../services/auth.service'
import TokenManager from '@/helpers/TokenManager'
import { useAppDispatch } from '@/hooks/redux'
import { IError, IStatus } from '@/types/common.types'
import { setUser } from '@/actions/userSlice.action'
import { AxiosError } from 'axios'

import LoginForm from '../LoginForm/LoginForm'
import RegistrationForm from '../RegistrationForm/RegistrationForm'
import { Button } from '@/components'

import classes from './AuthForm.module.scss'

const AuthForm = () => {
	const [{ status: statusValue, message }, setStatus] = useState<IStatus>({ status: 'initial' })
	const [formType, setFormType] = useState<FormTypes>(FormTypes.LoginStep)
	const dispatch = useAppDispatch()
	const isLoginForm = formType === FormTypes.LoginStep

	const onChangeFormType = (type: FormTypes) => {
		setFormType(type)
		setStatus({ status: 'initial' })
	}

	const handleSuccess = ({ jwt, user }: IAuthDataResponse) => {
		setStatus({ status: 'success' })
		TokenManager.updateLocalAccessToken(jwt)
		dispatch(setUser(user))
	}

	const handleError = (error: AxiosError) => {
		const typedError = error.response?.data as IError

		setStatus({
			status: 'error',
			message: typedError.error.details?.errors?.map((message) => message?.message) || typedError.error.message
		})
	}

	const handleLogin = async (authData: ILoginDataRequest | undefined) => {
		if (!authData) return

		try {
			const response = await AuthService.login(authData)

			handleSuccess(response)
		} catch (error) {
			handleError(error as AxiosError)
		}
	}

	const handleRegistration = async (authData: IRegisterDataRequest | undefined) => {
		if (!authData) return

		try {
			const response = await AuthService.register(authData)

			handleSuccess(response)
		} catch (error) {
			handleError(error as AxiosError)
		}
	}

	const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
		let authData: IRegisterDataRequest | ILoginDataRequest | undefined
		const commonOptions = {
			event,
			errorCallback: () => setStatus({ status: 'error', message: 'Fill fields' }),
			loadingCallback: () => setStatus({ status: 'loading' })
		}

		if (isLoginForm) {
			authData = submitFormHandler<ILoginDataRequest>(commonOptions)
			handleLogin(authData)
		} else {
			authData = submitFormHandler<IRegisterDataRequest>(commonOptions)
			handleRegistration(authData)
		}
	}

	return (
		<div className={classes.wrapper}>
			<div className={classes.content}>
				<header>
					{authFormData.map(({ type, value }) => (
						<p className={formType === type ? classes.active : ''} onClick={() => onChangeFormType(type)} key={value}>
							{value}
						</p>
					))}
				</header>
				<form method='POST' onSubmit={onSubmitHandler}>
					{formType === FormTypes.LoginStep ? <LoginForm /> : <RegistrationForm />}
					{statusValue === 'error' &&
						(Array.isArray(message) ? (
							message.map((message) => (
								<span className={classes.error} key={message}>
									{message}
								</span>
							))
						) : (
							<span className={classes.error}>{message}</span>
						))}
					<Button disabled={statusValue === 'loading'} type='submit'>
						Send
					</Button>
				</form>
			</div>
		</div>
	)
}

export default AuthForm
