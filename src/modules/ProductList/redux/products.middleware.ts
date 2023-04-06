import { RootState } from '@/redux/index'
import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'
import { IProduct } from '../'
import { Events } from '../types/socket.enum'
import { connectToSocket, setProducts } from './productsSlice.actions'

const productMiddleware: Middleware = (store: MiddlewareAPI) => (next) => (action) => {
	if (!connectToSocket.match(action)) {
		return next(action)
	}

	const socket = io('http://localhost:1337')
	const dispatch = store.dispatch

	socket.connect()

	socket.on('connect', () => {
		socket.on(Events.AddProduct, (newProduct: IProduct) => {
			const products = (store.getState() as RootState).productsStore.products

			if (!products) return

			const newProducts = [...(products || []), newProduct]

			dispatch(setProducts(newProducts))
		})

		socket.on(Events.UpdateProduct, (updatedProduct: IProduct) => {
			const products = (store.getState() as RootState).productsStore.products

			if (!products) return

			const arrayWithUpdatedProduct = products.map((product) => {
				if (product.id === updatedProduct.id) {
					product = updatedProduct
				}

				return product
			})

			dispatch(setProducts(arrayWithUpdatedProduct))
		})

		socket.on(Events.DeleteProduct, (deletedProduct: IProduct) => {
			const products = (store.getState() as RootState).productsStore.products

			if (!products) return

			const arrayWithoutDeletedProduct = products.filter((product) => product.id !== deletedProduct.id)

			dispatch(setProducts(arrayWithoutDeletedProduct))
		})
	})

	next(action)
}

export default productMiddleware
