import userSlice from './user.slice'
import modalsSlice from './modals.slice'
import { productsSlice } from '@/modules/ProductList'
import { cartSlice } from '@/modules/CartPopup'

export const stores = {
	authStore: userSlice,
	productsStore: productsSlice,
	cartStore: cartSlice,
	modalsStore: modalsSlice
}
