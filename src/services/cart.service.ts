import withAuthorization from '@/config/withAuthorization.config'
import { AxiosInstance } from 'axios'
import { IGetCartResponse, ICartProductResponse } from '@/types/services/cartService.types'

class CartService {
	private readonly api: AxiosInstance

	constructor(api: AxiosInstance) {
		this.api = api
	}

	async getCart() {
		const { data } = await this.api.get<IGetCartResponse>('cart')

		return data
	}

	async removeCartProduct(productId: number) {
		const { data } = await this.api.delete<ICartProductResponse>('cart/remove', {
			params: {
				id: productId
			}
		})

		return data
	}

	async addProductToCart(productId: number) {
		const { data } = await this.api.post<ICartProductResponse>('cart/add', {
			id: productId
		})

		return data
	}

	async clearCart() {
		const { data } = await this.api.delete<ICartProductResponse>('cart')

		return data
	}
}

export default new CartService(withAuthorization)
