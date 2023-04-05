import { createAsyncThunk } from '@reduxjs/toolkit'
import CartService from '@/services/cart.service'

const getCartProducts = createAsyncThunk('cart/getCart', async () => {
	const { cart } = await CartService.getCart()

	if (!cart) return []

	return cart.products
})

export { getCartProducts }
