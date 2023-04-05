import { FC, ReactNode } from 'react'
import { IProduct } from '@/types/services/productsService.types'

import classes from './Product.module.scss'

interface IProductProps {
	product: IProduct
	children: ReactNode
	className?: string
}

const Product: FC<IProductProps> = ({ className, product: { price, title, image }, children }) => (
	<div className={`${classes.product} ${className ?? ''}`}>
		<img
			src={image?.url || 'https://uv-technology.ru/images/stories/virtuemart/product/Заглушка%20на%20товар4.jpg'}
			alt='productImage'
		/>
		<div className={classes.content}>
			<h2>{title}</h2>
			<p>{price}$</p>
		</div>
		<div className={classes.action}>{children}</div>
	</div>
)

export default Product
