import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setIsCartPopupShow } from '@/redux/slices/modals.slice'
import { getCartProducts } from '../../redux/cart.thunks'

import { RxCross2 } from 'react-icons/rx'
import CartProductsList from './CartProductsList/CartProductsList'

import classes from './CartPopup.modules.scss'

const CartPopup = () => {
	const isCartModalShow = useAppSelector(({ modalsStore }) => modalsStore.isCartPopupShow)
	const dispatch = useAppDispatch()

	const onCloseCartPopupHandler = () => {
		dispatch(setIsCartPopupShow(false))
	}

	useEffect(() => {
		dispatch(getCartProducts())
	}, [dispatch])

	if (!isCartModalShow) return null

	return (
		<div className={classes.wrapper}>
			<aside className={classes.cart}>
				<header>
					<h2>Cart</h2>
					<span onClick={onCloseCartPopupHandler} className={classes.cross}>
						<RxCross2 size={25} />
					</span>
				</header>
				<CartProductsList />
			</aside>
		</div>
	)
}

export default CartPopup
