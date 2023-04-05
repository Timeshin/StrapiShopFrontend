import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useEffect } from 'react'
import { getProducts } from '../../redux/products.thunks'
import { useNavigate } from 'react-router-dom'

import { Loader, Product, Button } from '@/components'

import classes from './ProductsList.module.scss'

const ProductsList = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const isLoading = useAppSelector(({ productsStore }) => productsStore.status.status === 'loading')
	const isError = useAppSelector(({ productsStore }) => productsStore.status.status === 'error')
	const products = useAppSelector(({ productsStore }) => productsStore.products)

	useEffect(() => {
		if (products?.length) return

		dispatch(getProducts())
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
