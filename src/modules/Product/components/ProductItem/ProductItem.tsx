import { useEffect, useState } from 'react'
import ProductsService from '@/services/products.service'
import { IProduct } from '@/modules/ProductList'
import { useParams } from 'react-router-dom'
import CartService from '@/services/cart.service'
import { setCartProducts } from '@/modules/CartPopup'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

import { Button, Loader, Product } from '@/components'

const ProductItem = () => {
	const [product, setProduct] = useState<IProduct>()
	const [isLoading, setIsLoading] = useState(true)
	const [isAddToCartLoading, setIsAddToCartLoading] = useState(false)
	const isProductAlreadyInCart = useAppSelector(({ cartStore }) =>
		cartStore.cartProducts?.some(({ id }) => id === product?.id)
	)
	const isCartLoading = useAppSelector(({ cartStore }) => cartStore.status.status === 'loading')
	const dispatch = useAppDispatch()
	const params = useParams()

	const onAddProductToCartHadnler = () => {
		setIsAddToCartLoading(true)
		CartService.addProductToCart((product as IProduct).id)
			.then(({ products }) => dispatch(setCartProducts(products)))
			.finally(() => {
				setIsAddToCartLoading(false)
			})
	}

	useEffect(() => {
		ProductsService.getProduct(params.productId as string)
			.then((product) => setProduct(product))
			.finally(() => setIsLoading(false))
	}, [params])

	if (isLoading || isCartLoading) return <Loader />

	if (!product) return <h2>No product</h2>

	return (
		<>
			<Product product={product}>
				{isProductAlreadyInCart ? (
					<p>Product added to cart</p>
				) : (
					<Button disabled={isAddToCartLoading} onClick={onAddProductToCartHadnler}>
						Add to cart
					</Button>
				)}
			</Product>
		</>
	)
}

export default ProductItem
