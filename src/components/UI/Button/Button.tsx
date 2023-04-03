import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

import classes from './Button.module.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	variant?: 'outlined' | 'contained'
}

const Button: FC<IButton> = ({ children, className = '', variant, ...props }) => (
	<button
		type='button'
		className={`
		${className}
		${classes.button}
		${variant === 'outlined' ? classes.outlined : ''}`}
		{...props}
	>
		{children}
	</button>
)
export default Button
