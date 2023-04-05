import { Outlet } from 'react-router-dom'
import { CartPopup } from '@/modules/CartPopup'
import { Header } from '@/components'

import classes from './MainPageLayout.module.scss'

const MainPageLayout = () => (
	<div className={classes.layout}>
		<Header />
		<Outlet />
		<CartPopup />
	</div>
)

export default MainPageLayout
