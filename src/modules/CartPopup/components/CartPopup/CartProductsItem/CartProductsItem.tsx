import { FC, useState } from 'react'
import { useAppDispatch } from '@/hooks/redux'
import CartService from '@/services/cart.service'
import { setCartProducts } from '@/modules/CartPopup'
import { IProduct } from '@/modules/ProductList'

import { Button, Product } from '@/components'

import classes from './CartProductsItem.module.scss'

interface ICartProductsItem {
	product: IProduct
}

const CartProductsItem: FC<ICartProductsItem> = ({ product }) => {
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useAppDispatch()

	const onRemoveCartProductHandler = async () => {
		setIsLoading(true)

		await CartService.removeCartProduct(product.id)
			.then(({ products }) => {
				dispatch(setCartProducts(products))
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<Product key={product.id} className={classes.product} product={product}>
			<Button disabled={isLoading} onClick={onRemoveCartProductHandler}>
				Remove
			</Button>
		</Product>
	)
}

export default CartProductsItem
