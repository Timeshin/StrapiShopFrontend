import { useAppSelector } from '@/hooks/redux'
import { setCartProducts } from '@/modules/CartPopup'
import CartService from '@/services/cart.service'
import { useDispatch } from 'react-redux'

import { Button, Loader } from '@/components'
import CartProductsItem from '../CartProductsItem/CartProductsItem'

import classes from './CartProductsList.module.scss'

const CartProductsList = () => {
	const cartProducts = useAppSelector(({ cartStore }) => cartStore.cartProducts)
	const isLoading = useAppSelector(({ cartStore }) => cartStore.status.status === 'loading')
	const isError = useAppSelector(({ cartStore }) => cartStore.status.status === 'error')
	const dispatch = useDispatch()

	const onClearCardHandler = () => {
		CartService.clearCart().then(({ products }) => {
			dispatch(setCartProducts(products))
		})
	}

	if (isLoading) return <Loader />

	if (isError) return <h1>Error</h1>

	if (!cartProducts?.length)
		return (
			<div className={classes.content}>
				<h4>Empty</h4>
			</div>
		)

	return (
		<div className={classes.content}>
			{cartProducts?.map((product) => (
				<CartProductsItem key={product.id} product={product} />
			))}
			<Button onClick={onClearCardHandler} variant='outlined' className={classes.clearButton}>
				Clear cart
			</Button>
		</div>
	)
}

export default CartProductsList
