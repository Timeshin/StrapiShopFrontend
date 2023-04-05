import { setUser } from '@/redux/actions/userSlice.actions'
import TokenManager from '@/helpers/TokenManager'
import { setIsCartPopupShow } from '@/redux/slices/modals.slice'
import { useAppDispatch } from '@/hooks/redux'

import { ImExit } from 'react-icons/im'
import { BsCart4 } from 'react-icons/bs'

import classes from './Header.module.scss'

const Header = () => {
	const dispatch = useAppDispatch()

	const onLogoutHandler = () => {
		TokenManager.deleteToken()
		dispatch(setUser(null))
	}

	const onOpenCartPopupHandler = () => {
		dispatch(setIsCartPopupShow(true))
	}

	return (
		<header className={classes.header}>
			<div className={classes.leftSide}>
				<span onClick={onOpenCartPopupHandler}>
					<BsCart4 size={24} />
				</span>
				<span onClick={onLogoutHandler}>
					<ImExit size={24} />
				</span>
			</div>
		</header>
	)
}

export default Header
