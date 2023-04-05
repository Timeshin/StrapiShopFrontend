import withAuthorization from '@/config/withAuthorization.config'
import { AxiosInstance } from 'axios'
import { IProduct } from '@/types/services/productsService.types'

class ProductsService {
	private readonly api: AxiosInstance

	constructor(api: AxiosInstance) {
		this.api = api
	}

	async getProducts() {
		const { data } = await this.api.get<IProduct[]>('products')

		return data
	}

	async getProduct(id: string) {
		const { data } = await this.api.get(`products/${id}`)

		return data
	}
}

export default new ProductsService(withAuthorization)
