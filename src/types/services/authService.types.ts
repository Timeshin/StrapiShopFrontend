import { IUser } from '@/types/redux/userSlice.types'

export interface IRegisterDataRequest {
	username: string
	email: string
	password: string
}

export interface ILoginDataRequest {
	identifier: string
	password: string
}

export interface IAuthDataResponse {
	jwt: string
	user: IUser
}
