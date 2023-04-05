import { IProduct } from '@/modules/ProductList'
import { IUser } from '@/types/redux/userSlice.types'

export interface IGetCartResponse {
	cart: {
		id: number
		createdAt: string
		updatedAt: string
		user: IUser
		products: IProduct[]
	}
}

export interface ICartProductResponse {
	products: IProduct[]
}
