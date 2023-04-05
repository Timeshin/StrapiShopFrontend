import ProductsService from '@/services/products.service'
import { createAsyncThunk } from '@reduxjs/toolkit'

const getProducts = createAsyncThunk('user/getProducts', async () => {
	const response = await ProductsService.getProducts()

	return response
})

export { getProducts }
