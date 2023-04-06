import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductsService from '@/services/products.service'
import { connectToSocket, setProducts } from '../../redux/productsSlice.actions'

import { Loader, Product, Button } from '@/components'

import classes from './ProductsList.module.scss'

const ProductsList = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const products = useAppSelector(({ productsStore }) => productsStore.products)

	useEffect(() => {
		if (products?.length) return
		setIsLoading(true)

		ProductsService.getProducts()
			.then((products) => {
				dispatch(setProducts(products))
				setIsError(false)
			})
			.catch(() => {
				setIsError(true)
			})
			.finally(() => {
				setIsLoading(false)
				dispatch(connectToSocket())
			})
	}, [dispatch, products?.length])

	const onNavigateProductPageHandler = (id: number) => {
		navigate(`/${id}`)
	}

	if (isError) return <h1>Error</h1>

	return (
		<main className={classes.content}>
			{isLoading ? (
				<Loader />
			) : (
				products?.map((product) => (
					<div key={product.id}>
						<Product key={product.id} product={product}>
							<Button onClick={() => onNavigateProductPageHandler(product.id)}>Details</Button>
						</Product>
					</div>
				))
			)}
		</main>
	)
}

export default ProductsList
