import { FC, InputHTMLAttributes } from 'react'

import classes from './Input.module.scss'

type Input = InputHTMLAttributes<HTMLInputElement>

const Input: FC<Input> = ({ className, ...props }) => (
	<input
		type='text'
		className={`
			${classes.input}
			${className}
		`}
		{...props}
	/>
)

export default Input
